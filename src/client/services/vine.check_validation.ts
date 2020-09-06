import { Injectable } from '@nestjs/common';
import { VineInfoDto } from '../stripe/dto/vine.sell.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vine } from '../../entities/vine.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export class VineCheckRules {
  constructor(@InjectRepository(Vine) private readonly vineRepository: Repository<Vine>) {
  }

  public async chechkVinesAndCalculate(vineInfoDto: Array<VineInfoDto>): Promise<[boolean, number]> {
    let totalPrice = 0;
    for (const vineInfo of vineInfoDto) {
      const vineExist = await this.vineRepository.findOne(vineInfo.vineId);
      if (!vineExist) return [false, null];
      totalPrice += vineExist.price * vineInfo.quantity;
    }
    return [true, totalPrice];
  }

}