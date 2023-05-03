import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Image } from './image.entity';
import { v4 as uuidv4 } from 'uuid';
import { createWriteStream } from 'fs';
import { extname } from 'path';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async create(
    id: number,
    file: Express.Multer.File,
    name: string,
    description: string,
  ): Promise<Image> {
    const image = new Image();
    image.name = name;
    image.description = description;
    image.user_id = id;

    // Generate a unique filename for the uploaded file
    const uniqueFilename = uuidv4() + extname(file.originalname);

    // Write the file to disk
    const path = `./uploads/${uniqueFilename}`;
    const writeStream = createWriteStream(path);
    writeStream.write(file.buffer);
    writeStream.end();

    // Set the URL of the image
    image.image_url = `http://localhost:3000/uploads/${uniqueFilename}`;

    // Save the image to the database
    return await this.imageRepository.save(image);
  }

  findAll(): Promise<Image[]> {
    return this.imageRepository.find();
  }

  async findOne(id: number): Promise<Image> {
    return await this.imageRepository.findOneBy({
      id: id,
    });
  }

  async findOneByUser(id: number): Promise<Image> {
    return await this.imageRepository.findOneBy({
      user_id: id,
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
