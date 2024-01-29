import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { AIRes, OAuthRes } from './diet.dto';
import { Diet } from './diet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DietService {
  private accessToken: string | undefined;
  private readonly baiduBaseUrl: string | undefined;
  private readonly go2OAuth: string | undefined;
  private readonly dishUrl: string | undefined;
  private hadSend: boolean | undefined;

  constructor(
    @InjectRepository(Diet)
    private readonly httpService: HttpService,
    private readonly dietRepository: Repository<Diet>,
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

  async createDietRecord(recordData: Partial<Diet>): Promise<Diet> {
    const record = this.dietRepository.create(recordData);
    return await this.dietRepository.save(record);
  }

  async getUserDietRecord(condition: Partial<Diet>): Promise<Diet[]> {
    return this.dietRepository.find({ where: condition });
  }
}
