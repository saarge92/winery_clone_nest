import { InjectRepository } from '@nestjs/typeorm';
import { Country } from '../../entities/country.entity';
import { Repository } from 'typeorm/index';
import { CountryDto } from '../dto/country.dto';
import { ICountryInterface } from '../intefaces/country_service.interface';
import { ConflictException } from '@nestjs/common';

/**
 * Country Service containing business logic
 * about countries
 * @author Serdar Durdyev
 */
export class CountryService implements ICountryInterface {
  constructor(@InjectRepository(Country) private readonly countryRepository: Repository<Country>) {
  }

  /**
   * Get countries list
   * @returns {Promise<Country[]>} Array of countries
   */
  public async getCountries(): Promise<Country[]> {
    return await this.countryRepository.find();
  }

  /**
   * Get country by id
   * @param id Id of requested id
   * @return {Promise<Country>} Returns asynchronously requested country
   */
  public async getCountry(id: string): Promise<Country> {
    return await this.countryRepository.findOne(id);
  }

  /**
   * Create country in our system
   * @param countryDto Data transfer object about new country in our system
   * @return {Promise<Country>} Returns asynchronously created country
   */
  public async createCountry(countryDto: CountryDto): Promise<Country> {
    const newCountry = new Country();
    this.initCountryFromDto(newCountry, countryDto);
    await this.countryRepository.save(newCountry);
    return newCountry;
  }

  /**
   * Update created country in our system
   * @param id Id of updating country
   * @param countryDto Data transfer object about new country data
   * @return {Promise<Country>} Returns asynchronously updated country
   */
  public async updateCountry(id: string, countryDto: CountryDto): Promise<Country> {
    const country = await this.countryRepository.findOne(id);
    if (!country)
      throw new ConflictException('Такая страна не найдена');
    this.initCountryFromDto(country, countryDto);
    await this.countryRepository.save(country);
    return country;
  }

  /**
   * Delete country by id
   * @param id Id of deleting country
   */
  public async deleteCountry(id: string) {
    const country = await this.countryRepository.findOne(id);
    if (!country)
      throw new ConflictException('Страна с таким id отсутствует');
    await this.countryRepository.softDelete({ id });
  }

  /**
   * Init new or updated country
   * @param country New or updated country
   * @param countryDto Data transfer object with new data
   */
  private initCountryFromDto(country: Country, countryDto: CountryDto) {
    country.nameRus = countryDto.name_rus;
    if (countryDto.name_en) country.nameEn = countryDto.name_en;
  }
}