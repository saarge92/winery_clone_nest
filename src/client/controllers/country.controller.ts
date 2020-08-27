import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { COUNTRY_SERVICE } from '../constants/client.constants';
import { ICountryInterface } from '../intefaces/country_service.interface';
import { Country } from '../../entities/country.entity';
import { CountryDto } from '../dto/country.dto';
import { Roles } from '../../auth/decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Response, response } from 'express';

/**
 * Controller for serving request about countries
 * @author Serdar Durdyev
 */
@Controller('/country')
export class CountryController {
  constructor(@Inject(COUNTRY_SERVICE) private readonly countryService: ICountryInterface) {
  }

  /**
   * Get list of countries
   * @returns {Promise<Array<Country>>} Возвращает список стран
   */
  @Get('/')
  public async getCountry(): Promise<Country[]> {
    return await this.countryService.getCountries();
  }

  /**
   * Create country country in our system
   * @param countryDto Data transfer object about created country
   * @return {Promise<Country>} Returns new created country
   */
  @Post('/')
  @Roles('Admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  public async createCountry(@Body()countryDto: CountryDto): Promise<Country> {
    return await this.countryService.createCountry(countryDto);
  }

  /**
   * Get country by id
   * @param id Id of searching country
   * @return {Promise<Country>} Return requested country
   */
  @Get('/:id')
  public async getCountryById(@Param('id')id: string): Promise<Country> {
    return await this.countryService.getCountry(id);
  }

  /**
   * Удаление страны из базы данных
   * @param id Id удаляемой страны
   * @param response Ответ в формате json об успешном удалении объекта
   */
  @Delete('/:id')
  @Roles('Admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  public async deleteCountry(@Param('id')id: string, @Res()response: Response) {
    await this.countryService.deleteCountry(id);
    return response.json({
      message: 'Successfully deleted',
    }).status(HttpStatus.OK);
  }

  /**
   * Update country by id
   * @param id Id of updated country
   * @param countryDto Data transfer object about country
   */
  @Put('/:id')
  @Roles('Admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  public async updateCountry(id: string, @Body()countryDto: CountryDto): Promise<Country> {
    return await this.countryService.updateCountry(id, countryDto);
  }
}