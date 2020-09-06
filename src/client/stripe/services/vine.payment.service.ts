import { ConflictException, Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { VineSellDto } from '../dto/vine.sell.dto';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { VineCheckRules } from '../../services/vine.check_validation';
import { throwError } from 'rxjs';

@Injectable()
export class VineStripeService {
  private readonly publicApiKey: string;
  private readonly privateApiKey: string;

  constructor(@InjectStripe() private readonly stripeClient: Stripe,
              protected readonly configService: ConfigService,
              protected readonly vineCheckService: VineCheckRules) {
    this.publicApiKey = configService.get<string>('STRIPE_PUBLIC_KEY');
    this.privateApiKey = configService.get<string>('STRIPE_PRIVATE_KEY');
  }

  public async buyVine(vineSellInfo: VineSellDto) {
    const checkValidationVines = await this.vineCheckService.chechkVinesAndCalculate(vineSellInfo.vines);
    if (!checkValidationVines[0])
      throw new ConflictException('Неверно указаны вина в списке. Проверьте вина');
    const token = await this.createTokenForPayInfo(vineSellInfo);
    const charge = await this.createCharge(checkValidationVines[1], token).catch(error => {
      throw new ConflictException(error);
    });
    return charge;
  }

  private async createTokenForPayInfo(vineSellInfo: VineSellDto): Promise<Stripe.Response<Stripe.Token>> {
    const response = await this.stripeClient.tokens.create({
      card: {
        currency: 'usd',
        number: vineSellInfo.card_number,
        cvc: vineSellInfo.csv_code,
        name: vineSellInfo.card_holder,
        exp_month: vineSellInfo.expires_month.toString(),
        exp_year: vineSellInfo.expires_year.toString(),
      },
    }, {
      apiKey: this.publicApiKey,
    }).catch(error => {
      throw new ConflictException(error);
    });
    return response;
  }

  private async createCharge(amount: number, token: Stripe.Token) {
    const charge = await this.stripeClient.charges.create({
      amount: amount * 100,
      currency: 'usd',
      source: token.id,
    }, {
      apiKey: this.privateApiKey,
    });
    return charge;
  }
}
