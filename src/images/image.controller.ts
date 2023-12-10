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
  Req,
  Query,
} from '@nestjs/common';
import { CreateImageDto, UpdateImageDto } from './image.dto';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '../users/user.entity';

@Controller('images')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Req() request: Express.Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() createImageDto: CreateImageDto,
  ) {
    const user = request.user as User;
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    return await this.imageService.create(
      user.id,
      file,
      createImageDto.name,
      createImageDto.description,
    );
  }

  @Get('fineOne')
  async findOne(@Query('id') id: number) {
    return await this.imageService.findOne(id);
  }

  @Get('fineOneByUser')
  async findOneByUser(@Req() request: Express.Request) {
    const user = request.user as User;
    const res = await this.imageService.findOneByUser(user.id);
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
  remove(@Query() id: number) {
    return this.imageService.remove(id);
  }
}
