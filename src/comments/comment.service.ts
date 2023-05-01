import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  create(content: string, user_id: number, image_id: number): Promise<Comment> {
    const comment = new Comment();
    comment.content = content;
    comment.user_id = user_id;
    comment.image_id = image_id;
    return this.commentsRepository.save(comment);
  }

  findAll(): Promise<Comment[]> {
    return this.commentsRepository.find();
  }

  async findOne(id: number): Promise<Comment> {
    return await this.commentsRepository.findOneBy({
      id: id,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.commentsRepository.delete(id);
  }
}
