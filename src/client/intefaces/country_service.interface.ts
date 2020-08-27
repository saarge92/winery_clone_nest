import { Country } from '../../entities/country.entity';
import { CountryDto } from '../dto/country.dto';

export interface ICountryInterface {
  getCountries(): Promise<Country[]>;

  getCountry(id: string): Promise<Country>;

  createCountry(countryDto: CountryDto): Promise<Country>;

  updateCountry(id: string, countryDto: CountryDto): Promise<Country>;

  deleteCountry(id: string);
}