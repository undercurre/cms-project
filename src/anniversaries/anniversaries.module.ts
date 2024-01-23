import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnniversariesService } from './anniversaries.service';
import { AnniversariesController } from './anniversaries.controller';
import { AnniversariesEntity } from './anniversaries.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([AnniversariesEntity]), HttpModule],
  providers: [AnniversariesService],
  controllers: [AnniversariesController],
  exports: [AnniversariesService],
})
export class AnniversariesModule {}
