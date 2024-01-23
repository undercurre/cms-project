import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { AnniversariesService } from './anniversaries.service';
import { AnniversariesEntity } from './anniversaries.entity';
import { User } from '../users/user.entity';

@Controller('anniversaries')
export class AnniversariesController {
  constructor(private readonly anniversariesService: AnniversariesService) {}

  @Post()
  createAnniversaries(
    @Req() request: Express.Request,
    @Body() recordData: Partial<AnniversariesEntity>,
  ) {
    const user = request.user as User;
    return this.anniversariesService.createAnniversaries({
      ...recordData,
      userId: user.id,
    });
  }

  @Get()
  getAllAnniversariess() {
    return this.anniversariesService.getAllAnniversaries();
  }

  @Get('getById/:id')
  getAnniversariesById(@Param('id') id: string) {
    return this.anniversariesService.getAnniversariesById(id);
  }

  @Get('getByUserId')
  getAnniversariesByUserId(
    @Req() request: Express.Request,
    @Query() query: Partial<AnniversariesEntity>,
  ) {
    const user = request.user as User;
    const obj: Partial<AnniversariesEntity> = query;
    obj.userId = user.id;
    return this.anniversariesService.getAnniversariesByCondition(obj);
  }

  @Put(':id')
  updateAnniversaries(
    @Param('id') id: string,
    @Body() recordData: Partial<AnniversariesEntity>,
  ) {
    return this.anniversariesService.updateAnniversaries(id, recordData);
  }

  @Delete(':id')
  deleteAnniversaries(@Param('id') id: string) {
    return this.anniversariesService.deleteAnniversaries(id);
  }
}
