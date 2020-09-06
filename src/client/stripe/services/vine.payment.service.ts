import { ConflictException, Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { VineSellDto } from '../dto/vine.sell.dto';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { VineCheckRules } from '../../services/vine.check_validation';

/**
 * Service for payment for vine
 * Here we use stripe for payment service
 * @author Serdar Durdyev
 */
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

  /**
   * Process of selling vine
   * @param vineSellInfo Data transfer object which contains info  about vines selling
   */
  public async buyVine(vineSellInfo: VineSellDto): Promise<Stripe.Charge> {
    const checkValidationVines = await this.vineCheckService.chechkVinesAndCalculate(vineSellInfo.vines);
    if (!checkValidationVines[0])
      throw new ConflictException('Неверно указаны вина в списке. Проверьте вина');

    const token = await this.createTokenForPayInfo(vineSellInfo).catch(error => {
      throw new ConflictException({
        message: error.message,
        type: error.rawType,
      });
    });

    const charge = await this.createCharge(checkValidationVines[1], token).catch(error => {
      throw new ConflictException({
        message: error.message,
        type: error.rawType,
      });
    });

    return charge;
  }

  /**
   * Sending token with card data for verification data
   * about card
   * @param vineSellInfo Data transfer object about order
   * @return {Promise<Stripe.Token>} Returns generated token
   */
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
    });
    return response;
  }

  /**
   * Create payment
   * @param amount Summary money to pay
   * @param token Verification data for payment
   */
  private async createCharge(amount: number, token: Stripe.Token): Promise<Stripe.Charge> {
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
