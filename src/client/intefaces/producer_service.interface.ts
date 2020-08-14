import { Observable } from 'rxjs';
import { ProducerEntity } from '../../entities/producer.entity';
import { ProducerDto } from '../dto/producer.dto';

/**
 * Interface which defines business logic of producer service
 * Contains basic methods for ProducerService class
 *
 * @author Serdar Durdyev
 */
export interface IProducerService {
  getListOfProducers(perPage?: number, currentPage?: number): Promise<Observable<ProducerEntity[]>>;

  createProducer(producerDto: ProducerDto): Promise<ProducerEntity>;

  getProducerById(id: string): Promise<ProducerEntity>;

  updateProducerById(id: string, producerDto: ProducerDto): Promise<ProducerEntity>;
}