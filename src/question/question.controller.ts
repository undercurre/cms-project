// src/question/question.controller.ts

import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './question.entity';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  createQuestion(@Body() questionData: Partial<Question>) {
    return this.questionService.createQuestion(questionData);
  }

  @Get()
  getAllQuestions() {
    return this.questionService.getAllQuestions();
  }

  @Get(':id')
  getQuestionById(@Param('id') id: string) {
    return this.questionService.getQuestionById(id);
  }

  @Put(':id')
  updateQuestion(
    @Param('id') id: string,
    @Body() questionData: Partial<Question>,
  ) {
    return this.questionService.updateQuestion(id, questionData);
  }

  @Delete(':id')
  deleteQuestion(@Param('id') id: string) {
    return this.questionService.deleteQuestion(id);
  }
}
