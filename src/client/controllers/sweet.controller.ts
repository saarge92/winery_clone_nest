import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SWEET_SERVICE } from '../constants/client.constants';
import { ISweetService } from '../intefaces/sweet_service.interface';
import { SweetDto } from '../dto/sweet.dto';
import { Sweet } from '../../entities/sweet.entity';
import { Roles } from '../../auth/decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';

/**
 * Sweet controller for serving request
 * @author Serdar Serdar
 */
@Controller('/sweet')
export class SweetController {
  constructor(@Inject(SWEET_SERVICE) private readonly sweetService: ISweetService) {
  }

  /**
   * Post new sweet in our system
   * @param sweetDto Data transfer object about new sweet
   */
  @Post('/')
  @Roles('Admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  public async createSweet(@Body()sweetDto: SweetDto) {
    return await this.sweetService.createSweet(sweetDto);
  }

  /**
   * Create list of sweets in our system
   * @returns {Promise<Array<Sweet>>} Returns list of list in our system
   */
  @Get('/')
  public async getSweetList(): Promise<Array<Sweet>> {
    return await this.sweetService.getSweetList();
  }

  /**
   * Update existed sweet in our system
   * @param id Id of updated sweet
   * @param sweetDto Data transfer object for updating sweet data
   */
  @Put('/:id')
  @Roles('Admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  public async updateSweet(@Param('id') id: string, @Body()sweetDto: SweetDto) {
    return await this.sweetService.updateSweet(id, sweetDto);
  }

  /**
   * Get sweet by id in our system
   * @param id Id of searching sweet info
   * @return {Promise<Sweet>} Returns asynchronously sweet info
   */
  @Get('/:id')
  public async getSweet(@Param()id: string) {
    return await this.sweetService.getSweetById(id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @Roles('Admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  public async deleteSweetById(@Param('id')id: string) {
    await this.sweetService.deleteSweetById(id);
    return {
      'message': 'Successfully deleted',
    };
  }
}
