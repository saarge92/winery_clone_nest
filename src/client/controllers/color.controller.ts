import { ConflictException, Controller, Get, Inject, Req } from '@nestjs/common';
import { Request } from 'express';
import { Color } from '../../entities/color.entity';
import { IColorService } from '../intefaces/color_service.interface';
import { COLOR_SERVICE } from '../constants/client.constants';

@Controller('/colors')
export class ColorController {
  constructor(@Inject(COLOR_SERVICE) private readonly colorService: IColorService) {
  }

  @Get('/')
  public async getColors(@Req()request: Request): Promise<Array<Color>> {
    const perPage: any = request.query.perPage ?? 10;
    const currentPage: any = request.query.currentPage ?? 1;
    if (typeof perPage == 'string' || typeof currentPage == 'string')
      throw new ConflictException('Укажите числа в запросах пагинации');
    return await this.colorService.getList(perPage, currentPage);
  }
}