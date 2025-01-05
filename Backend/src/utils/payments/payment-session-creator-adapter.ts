import { GameModel } from "../../domain/models/game/game";
import { UserModel } from "../../domain/models/user/user";
import { CreatePaymentSession } from "../../domain/usecases/payment/create-payment-session";
import Stripe from 'stripe';

export class PaymentSessionCreatorAdapter implements CreatePaymentSession {
  readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  async create(user: UserModel, game: GameModel): Promise<string> {
    const stripe = new Stripe(this.secret);

    const priceInCents = parseInt(game.price.toString().replace('.', ''), 10);

    const product = await stripe.products.create({
      name: game.name,
      description: game.description || '',
    });

    const price = await stripe.prices.create({
      unit_amount: priceInCents,
      currency: 'usd',
      product: product.id,
    });

    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
    });

    await stripe.invoiceItems.create({
      customer: customer.id,
      price: price.id,
      description: game.name,
    });

    const invoice = await stripe.invoices.create({
      customer: customer.id,
      auto_advance: true,
    });

    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    return finalizedInvoice.hosted_invoice_url!;
  }
}
