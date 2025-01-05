import { AddGameMongoRepository } from "../../../infra/db/mongodb/game/add-game"
import { GetGameMongoRepository } from "../../../infra/db/mongodb/game/get-game"
import { GetUserMongoRepository } from "../../../infra/db/mongodb/user/get-user"
import { CheckoutController } from "../../../presentation/controllers/payment/checkout"
import { PaymentSessionCreatorAdapter } from "../../../utils/payments/payment-session-creator-adapter"
import { UserDecoderAdapter } from "../../../utils/user"
import env from "../../config/env"

export const makeCheckoutController = (): CheckoutController => {
  const userGetter = new GetUserMongoRepository()
  const secret = env.jwtSecret
  const userDecoder = new UserDecoderAdapter(secret)
  const gameGetter = new GetGameMongoRepository()
  const paymentSecret = env.stripeKey
  const paymentSessionCreator = new PaymentSessionCreatorAdapter(paymentSecret)
  return new CheckoutController(userDecoder, userGetter, gameGetter, paymentSessionCreator)
}
