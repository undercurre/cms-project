import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateCommentDto } from './comment.dto';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('create')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(
      createCommentDto.content,
      createCommentDto.user_id,
      createCommentDto.image_id,
    );
  }

  @Get('fineOne')
  async findOne(@Query('id') id: number) {
    return await this.commentService.findOne(id);
  }

  @Delete('delete')
  remove(@Query() id: number) {
    return this.commentService.remove(id);
  }
}
