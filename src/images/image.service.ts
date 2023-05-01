import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Image } from './image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  create(id: number, name: string, description: string): Promise<Image> {
    const image = new Image();
    image.name = name;
    image.description = description;
    image.user_id = id;
    return this.imageRepository.save(image);
  }

  findAll(): Promise<Image[]> {
    return this.imageRepository.find();
  }

  async findOne(id: number): Promise<Image> {
    return await this.imageRepository.findOneBy({
      id: id,
    });
  }

  update(id: number, name: string, description: string): Promise<UpdateResult> {
    return this.imageRepository.update(id, {
      name: name,
      description: description,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.imageRepository.delete(id);
  }
}
