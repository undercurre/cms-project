import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Image } from './image.entity';
import { v4 as uuidv4 } from 'uuid';
import { createWriteStream } from 'fs';
import * as pathNode from 'path';
import * as fs from 'fs';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async create(
    id: string,
    file: Express.Multer.File,
    name: string,
    description: string,
  ): Promise<Image> {
    const image = new Image();
    image.name = name;
    image.description = description;
    image.userId = id;

    // Generate a unique filename for the uploaded file
    const uniqueFilename = uuidv4() + pathNode.extname(file.originalname);

    // Write the file to disk
    const uploadDir = pathNode.join(__dirname, '../../', 'uploads');
    console.log(uploadDir);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const absolutePath = pathNode.join(
      __dirname,
      '../../',
      'uploads',
      uniqueFilename,
    );
    const writeStream = createWriteStream(absolutePath);
    writeStream.write(file.buffer);
    writeStream.end();

    // Set the URL of the image
    image.image_url = `http://81.71.85.68:9111/uploads/${uniqueFilename}`;

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

  async findOneByUser(id: string): Promise<[Image[], number]> {
    return await this.imageRepository.findAndCountBy({
      userId: id,
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
