import { Body, ConflictException, Controller, Delete, Get, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Color } from '../../entities/color.entity';
import { IColorService } from '../intefaces/color_service.interface';
import { COLOR_SERVICE } from '../constants/client.constants';
import { ColorDto } from '../dto/color.dto';
import { Roles } from '../../auth/decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';

/**
 * Colors controller for mapping colors requests
 * @author Serdar Durdyev
 */
@Controller('/colors')
export class ColorController {
  constructor(@Inject(COLOR_SERVICE) private readonly colorService: IColorService) {
  }

  /**
   * Get asynchronously list of colors
   * @param request Income request with pagination params
   */
  @Get('/')
  public async getColors(@Req()request: Request): Promise<Array<Color>> {
    const perPage: any = request.query.perPage ?? 10;
    const currentPage: any = request.query.currentPage ?? 1;
    if (typeof perPage == 'string' || typeof currentPage == 'string')
      throw new ConflictException('Укажите числа в запросах пагинации');
    return await this.colorService.getList(perPage, currentPage);
  }

  /**
   * Create color in our system
   * @param colorDto Data transfer object about creation color in our system
   * @return {Promise<Color>} Return asynchronously created color
   */
  @Post('/')
  @Roles('Admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  public async createColor(@Body()colorDto: ColorDto): Promise<Color> {
    return await this.colorService.createColor(colorDto);
  }


  /**
   * Delete color in our system
   * @param id Id of deleting color
   */
  @Delete('/:id')
  @Roles('Admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  public async deleteColor(@Param('id')id: string) {
    await this.colorService.deleteColor(id);
    return {
      message: 'Успешно удаленно',
    };
  }
}