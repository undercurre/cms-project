import { User } from '../users/user.entity';
import { AnalysisDto } from './diet.dto';
import { Diet } from './diet.entity';
import { DietService } from './diet.service';
import { Body, Controller, Post, Get, Req, Query } from '@nestjs/common';

@Controller('diet')
export class DietController {
  constructor(private DietService: DietService) {}

  @Post('analysis')
  async analysis(@Body() formData: AnalysisDto) {
    const res = await this.DietService.queryDishAI(formData.image);
    return res.data;
  }

  @Post('create')
  async createDietRecord(
    @Req() request: Express.Request,
    @Body() recordData: Partial<Diet>,
  ) {
    const user = request.user as User;
    return this.DietService.createDietRecord({
      ...recordData,
      user_id: user.id,
    });
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
