// src/question/question.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async createQuestion(questionData: Partial<Question>): Promise<Question> {
    const question = this.questionRepository.create(questionData);
    return await this.questionRepository.save(question);
  }

  async getAllQuestions(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async getQuestionById(id: string): Promise<Question | undefined> {
    return this.questionRepository.findOneBy({
      id: id,
    });
  }

  async updateQuestion(
    id: string,
    questionData: Partial<Question>,
  ): Promise<Question | undefined> {
    await this.questionRepository.update(id, questionData);
    return this.questionRepository.findOneBy({
      id: id,
    });
  }

  async deleteQuestion(id: string): Promise<void> {
    await this.questionRepository.delete(id);
  }
}
