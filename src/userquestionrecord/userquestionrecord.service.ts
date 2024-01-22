// src/userquestionrecord/userquestionrecord.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserQuestionRecord } from './userquestionrecord.entity';

@Injectable()
export class UserQuestionRecordService {
  constructor(
    @InjectRepository(UserQuestionRecord)
    private readonly userQuestionRecordRepository: Repository<UserQuestionRecord>,
  ) {}

  async createUserQuestionRecord(
    recordData: Partial<UserQuestionRecord>,
  ): Promise<UserQuestionRecord> {
    const record = this.userQuestionRecordRepository.create(recordData);
    return await this.userQuestionRecordRepository.save(record);
  }

  async getAllUserQuestionRecords(): Promise<UserQuestionRecord[]> {
    return this.userQuestionRecordRepository.find();
  }

  async getUserQuestionRecordById(
    id: string,
  ): Promise<UserQuestionRecord | undefined> {
    return this.userQuestionRecordRepository.findOneBy({
      id: id,
    });
  }

  async getUserQuestionRecordByCondition(
    condition: Partial<UserQuestionRecord>,
  ): Promise<UserQuestionRecord[]> {
    return this.userQuestionRecordRepository.find({ where: condition });
  }

  async updateUserQuestionRecord(
    id: string,
    recordData: Partial<UserQuestionRecord>,
  ): Promise<UserQuestionRecord | undefined> {
    await this.userQuestionRecordRepository.update(id, recordData);
    return this.userQuestionRecordRepository.findOneBy({
      id: id,
    });
  }

  async deleteUserQuestionRecord(id: string): Promise<void> {
    await this.userQuestionRecordRepository.delete(id);
  }
}
