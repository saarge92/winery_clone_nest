import { Provider } from '@nestjs/common';
import {
  COLOR_SERVICE,
  COUNTRY_SERVICE,
  PRODUCER_SERVICE,
  SWEET_SERVICE,
  VINE_SERVICE,
} from './constants/client.constants';
import { ProducerService } from './services/producer.service';
import { ColorService } from './services/color.service';
import { CountryService } from './services/country.service';
import { SweetService } from './services/sweet.service';
import { VineService } from './services/vine.service';

export const ClientProvider: Provider[] = [
  {
    provide: PRODUCER_SERVICE,
    useClass: ProducerService,
  },
  {
    provide: COLOR_SERVICE,
    useClass: ColorService,
  },
  {
    provide: COUNTRY_SERVICE,
    useClass: CountryService,
  },
  {
    provide: SWEET_SERVICE,
    useClass: SweetService,
  },
  {
    provide: VINE_SERVICE,
    useClass: VineService,
  },
];