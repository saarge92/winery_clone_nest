import { Provider } from '@nestjs/common';
import { PRODUCER_SERVICE } from './constants/client.constants';
import { ProducerService } from './services/producer.service';

export const ClientProvider: Provider[] = [
  {
    provide: PRODUCER_SERVICE,
    useClass: ProducerService,
  },
];