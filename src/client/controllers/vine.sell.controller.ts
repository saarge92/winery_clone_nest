import { Body, Controller, Post } from '@nestjs/common';
import { VineStripeService } from '../stripe/services/vine.payment.service';
import { VineSellDto } from '../stripe/dto/vine.sell.dto';

@Controller('vine/sell')
export class VineSellController {
  constructor(protected readonly vinePaymentService: VineStripeService) {
  }

  @Post('/')
  public async sellVines(@Body()vineSellInfo: VineSellDto) {
    const paymentInfo = await this.vinePaymentService.buyVine(vineSellInfo);
    return {
      message: 'Успешна покупка',
    };
  }
}