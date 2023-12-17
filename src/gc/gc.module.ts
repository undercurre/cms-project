import { Module } from '@nestjs/common';
import { GcController } from './gc.controller';
import { GcService } from './gc.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [GcController],
  providers: [GcService],
})
export class GcModule {}
