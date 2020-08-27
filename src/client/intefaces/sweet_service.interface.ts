import { SweetDto } from '../dto/sweet.dto';
import { Sweet } from '../../entities/sweet.entity';

/**
 *
 */
export interface ISweetService {
  createSweet(sweetDto: SweetDto): Promise<Sweet>;

  updateSweet(id: string, sweetDto: SweetDto): Promise<Sweet>;

  getSweetList(): Promise<Array<Sweet>>;

  getSweetById(id: string): Promise<Sweet>;

  deleteSweetById(id: string);
}
