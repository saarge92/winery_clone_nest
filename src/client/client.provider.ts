import { Provider } from '@nestjs/common';
import { COLOR_SERVICE, PRODUCER_SERVICE } from './constants/client.constants';
import { ProducerService } from './services/producer.service';
import { ColorService } from './services/color.service';

export const ClientProvider: Provider[] = [
  {
    provide: PRODUCER_SERVICE,
    useClass: ProducerService,
  },
  {
    provide: COLOR_SERVICE,
    useClass: ColorService,
  },
];