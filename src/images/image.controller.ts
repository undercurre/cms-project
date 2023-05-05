import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateImageDto, UpdateImageDto } from './image.dto';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createImageDto: CreateImageDto,
  ) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    return await this.imageService.create(
      createImageDto.user_id,
      file,
      createImageDto.name,
      createImageDto.description,
    );
  }

  @Get('fineOne')
  async findOne(@Param('id') id: number) {
    return await this.imageService.findOne(id);
  }

  @Get('fineOneByUser')
  async findOneByUser(@Param('id') id: number) {
    const res = await this.imageService.findOneByUser(id);
    return res[0];
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
    return this.imageService.remove(id);
  }
}
