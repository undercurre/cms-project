import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Req,
  Query,
} from '@nestjs/common';
import { CreateResourceDto, UpdateResourceDto } from './resource.dto';
import { ResourceService } from './resource.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '../users/user.entity';

@Controller('resources')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Req() request: Express.Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() createresourceDto: CreateResourceDto,
  ) {
    const user = request.user as User;
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    return await this.resourceService.create(
      user.id,
      file,
      createresourceDto.name,
      createresourceDto.description,
    );
  }

  @Get('fineOne')
  async findOne(@Query('id') id: number) {
    return await this.resourceService.findOne(id);
  }

  @Get('fineOneByUser')
  async findOneByUser(@Req() request: Express.Request) {
    const user = request.user as User;
    const res = await this.resourceService.findOneByUser(user.id);
    return res[0];
  }

  @Post('update')
  update(@Body() updateresourceDto: UpdateResourceDto) {
    return this.resourceService.update(
      updateresourceDto.id,
      updateresourceDto.name,
      updateresourceDto.description,
    );
  }

  @Delete('delete')
  remove(@Query() id: number) {
    return this.resourceService.remove(id);
  }
}
