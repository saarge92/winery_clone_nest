import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {

  /**
   * Получение изображения для вин
   * @param image Название файла в папке
   * @param response Ответ файла
   */
  @Get('public/vines/:image')
  public renderVineFile(@Param('image')image: any, @Res()response: Response) {
    const path = join(__dirname, '..', 'public/vines/', image);
    const pathExist = existsSync(path);
    if (!pathExist)
      throw new NotFoundException('Фотография не найдена');
    return response.sendFile(image, { root: 'public/vines' });
  }
}
