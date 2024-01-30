import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { AIRes, OAuthRes } from './diet.dto';
import { Diet } from './diet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as pathNode from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { createWriteStream } from 'fs';
import * as FormData from 'form-data';

@Injectable()
export class DietService {
  private accessToken: string | undefined;
  private readonly baiduBaseUrl: string | undefined;
  private readonly go2OAuth: string | undefined;
  private readonly dishUrl: string | undefined;
  private hadSend: boolean | undefined;

  constructor(
    @InjectRepository(Diet)
    private readonly dietRepository: Repository<Diet>,
    private readonly httpService: HttpService,
  ) {
    this.accessToken = '';
    this.baiduBaseUrl = 'https://aip.baidubce.com';
    this.dishUrl =
      this.baiduBaseUrl + '/rest/2.0/image-classify/v2/dish?access_token=';
    this.go2OAuth =
      this.baiduBaseUrl +
      '/oauth/2.0/token?grant_type=client_credentials&client_id=AG4Ul9EuPQa5y2dHsgI4bEsA&client_secret=bVT9G1ardsr9i76BuEN21AOqMObL1roj&';
    this.hadSend = false;
  }

  async queryOAuth() {
    const res = await this.httpService.axiosRef.post<OAuthRes>(this.go2OAuth);
    this.accessToken = res.data.access_token;
  }

  isErrorData(data: AIRes): data is { error_code: number; error_msg: string } {
    return (data as any).error_code !== undefined;
  }

  async queryDishAI(imageData: string): Promise<AxiosResponse<any, any>> {
    if (this.accessToken.length === 0) {
      await this.queryOAuth();
    }
    const formData = new FormData();
    formData.append('image', imageData);
    const res = await this.httpService.axiosRef.post<AIRes>(
      this.dishUrl + this.accessToken,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    if (this.isErrorData(res.data) && !this.hadSend) {
      // 数据是错误的
      await this.queryOAuth();
      this.hadSend = true;
      setTimeout(() => {
        this.hadSend = false;
      }, 200000);
      return await this.queryDishAI(imageData);
    }

    return res;
  }

  async createDietRecord(
    user_id: string,
    recordData: Partial<
      Omit<
        Diet,
        | 'image_url'
        | 'name'
        | 'id'
        | 'user_id'
        | 'calories'
        | 'meal_time'
        | 'created_at'
        | 'updated_at'
      >
    >,
    file: Express.Multer.File,
  ): Promise<Diet> {
    const diet = new Diet();
    // Generate a unique filename for the uploaded file
    const uniqueFilename = uuidv4() + pathNode.extname(file.originalname);

    // Write the file to disk
    const uploadDir = pathNode.join(__dirname, '../../', 'dietUploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const absolutePath = pathNode.join(
      __dirname,
      '../../',
      'dietUploads',
      uniqueFilename,
    );
    const writeStream = createWriteStream(absolutePath);
    await new Promise<void>((resolve, reject) => {
      writeStream.write(file.buffer);
      writeStream.end(() => {
        resolve();
      });
    });
    if (recordData.description) diet.description = recordData.description;
    // Set the URL of the image
    diet.image_url = `http://81.71.85.68:9111/dietUploads/${uniqueFilename}`;
    diet.user_id = user_id;
    if (fs.existsSync(absolutePath)) {
      const fileData = await fs.readFileSync(absolutePath);
      const base64String = fileData.toString('base64');
      const res = await this.queryDishAI(base64String);

      const correct = res.data.result.reduce((max, current) => {
        const currentProbability = parseFloat(current.probability);
        const maxProbability = parseFloat(max.probability);

        return currentProbability > maxProbability ? current : max;
      });

      diet.calories = correct.calorie;
      diet.name = correct.name;
      console.log(correct, diet);
    }
    return await this.dietRepository.save(diet);
  }

  async getUserDietRecord(condition: Partial<Diet>): Promise<Diet[]> {
    return this.dietRepository.find({ where: condition });
  }
}
