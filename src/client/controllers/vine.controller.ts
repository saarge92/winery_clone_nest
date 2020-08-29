import { Body, Controller, Inject, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { VineDto } from '../dto/vine.dto';
import { Vine } from '../../entities/vine.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { IVineService } from '../intefaces/vine_service_interface';
import { VINE_SERVICE } from '../constants/client.constants';
import { imageFilter } from '../../filters/image.filter';

@Controller('/vine')
export class VineController {
  constructor(@Inject(VINE_SERVICE) private readonly vineService: IVineService) {
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('image', {
      fileFilter: imageFilter,
    },
  ))
  public async createVine(@Body()vineDto: VineDto, @UploadedFile() file): Promise<Vine> {
    return await this.vineService.createVine(vineDto, file);
  }

}