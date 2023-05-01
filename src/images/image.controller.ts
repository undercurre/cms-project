import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateImageDto, UpdateImageDto } from './image.dto';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('create')
  create(@Body() createImageDto: CreateImageDto) {
    return this.imageService.create(
      createImageDto.user_id,
      createImageDto.name,
      createImageDto.description,
    );
  }

  @Get('fineOne')
  async findOne(@Param('id') id: number) {
    return await this.imageService.findOne(id);
  }

  @Post('update')
  update(@Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(
      updateImageDto.id,
      updateImageDto.name,
      updateImageDto.description,
    );
  }

  @Delete('delete')
  remove(@Param() id: number) {
    console.log(id);
    return this.imageService.remove(id);
  }
}
