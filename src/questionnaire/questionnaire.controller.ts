import { QuestionnaireService } from './questionnaire.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly QuestionnaireService: QuestionnaireService) {}

  @Post('penetrate')
  async postTrans(
    @Body()
    body: {
      url: string;
      data: Record<string, any>;
      method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    },
  ) {
    const { url, data, method } = body;
    const response = await this.QuestionnaireService.penetratp(
      url,
      data,
      method,
    );
    return response.data;
  }
}
