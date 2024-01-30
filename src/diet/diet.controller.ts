import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '../users/user.entity';
import { AnalysisDto } from './diet.dto';
import { Diet } from './diet.entity';
import { DietService } from './diet.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  Query,
  UploadedFile,
  HttpStatus,
  HttpException,
  UseInterceptors,
} from '@nestjs/common';

@Controller('diet')
export class DietController {
  constructor(private DietService: DietService) {}

  @Post('analysis')
  async analysis(@Body() formData: AnalysisDto) {
    const res = await this.DietService.queryDishAI(formData.image);
    return res.data;
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createDietRecord(
    @Req() request: Express.Request,
    @UploadedFile() file: Express.Multer.File,
    @Body()
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
  ) {
    const user = request.user as User;
    console.log('用户', user.id);
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    return this.DietService.createDietRecord(user.id, recordData, file);
  }

  @Get('getByUserId')
  getUserQuestionRecordByUserId(
    @Req() request: Express.Request,
    @Query() query: Partial<Diet>,
  ) {
    const user = request.user as User;
    const obj: Partial<Diet> = query;
    obj.user_id = user.id;
    return this.DietService.getUserDietRecord(obj);
  }
}
