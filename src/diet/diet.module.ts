import { Module } from '@nestjs/common';
import { DietController } from './diet.controller';
import { DietService } from './diet.service';
import { HttpModule } from '@nestjs/axios';
import { Diet } from './diet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Diet]), HttpModule],
  controllers: [DietController],
  providers: [DietService],
  exports: [DietService],
})
export class DietModule {}
