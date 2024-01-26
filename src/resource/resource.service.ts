import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Resource } from './resource.entity';
import { v4 as uuidv4 } from 'uuid';
import { createWriteStream } from 'fs';
import * as pathNode from 'path';
import * as fs from 'fs';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  async create(
    id: string,
    file: Express.Multer.File,
    name: string,
    description: string,
  ): Promise<Resource> {
    const resource = new Resource();
    resource.name = name;
    resource.description = description;
    resource.userId = id;

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

    // Set the URL of the resource
    resource.url = `http://81.71.85.68:9111/uploads/${uniqueFilename}`;

    // Save the resource to the database
    return await this.resourceRepository.save(resource);
  }

  findAll(): Promise<Resource[]> {
    return this.resourceRepository.find();
  }

  async findOne(id: number): Promise<Resource> {
    return await this.resourceRepository.findOneBy({
      id: id,
    });
  }

  async findOneByUser(id: string): Promise<[Resource[], number]> {
    return await this.resourceRepository.findAndCountBy({
      userId: id,
    });
  }

  update(id: number, name: string, description: string): Promise<UpdateResult> {
    return this.resourceRepository.update(id, {
      name: name,
      description: description,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.resourceRepository.delete(id);
  }
}
