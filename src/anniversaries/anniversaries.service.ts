import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnniversariesEntity } from './anniversaries.entity';

@Injectable()
export class AnniversariesService {
  constructor(
    @InjectRepository(AnniversariesEntity)
    private readonly anniversariesEntityRepository: Repository<AnniversariesEntity>,
  ) {}

  async createAnniversaries(
    recordData: Partial<AnniversariesEntity>,
  ): Promise<AnniversariesEntity> {
    const record = this.anniversariesEntityRepository.create(recordData);
    return await this.anniversariesEntityRepository.save(record);
  }

  async getAllAnniversaries(): Promise<AnniversariesEntity[]> {
    return this.anniversariesEntityRepository.find();
  }

  async getAnniversariesById(
    id: string,
  ): Promise<AnniversariesEntity | undefined> {
    return this.anniversariesEntityRepository.findOneBy({
      id: id,
    });
  }

  async getAnniversariesByCondition(
    condition: Partial<AnniversariesEntity>,
  ): Promise<AnniversariesEntity[]> {
    return this.anniversariesEntityRepository.find({ where: condition });
  }

  async updateAnniversaries(
    id: string,
    recordData: Partial<AnniversariesEntity>,
  ): Promise<AnniversariesEntity | undefined> {
    await this.anniversariesEntityRepository.update(id, recordData);
    return this.anniversariesEntityRepository.findOneBy({
      id: id,
    });
  }

  async deleteAnniversaries(id: string): Promise<void> {
    await this.anniversariesEntityRepository.delete(id);
  }
}
