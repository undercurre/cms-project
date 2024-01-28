import { DietService } from './diet.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('diet')
export class DietController {
  constructor(private readonly DietService: DietService) {}
}
