import { GameModel } from "../../../domain/models/game/game"
import { UserModel } from "../../../domain/models/user/user"
import { CreatePaymentSession } from "../../../domain/usecases/payment/create-payment-session"

export interface PaymentSessionCreator extends CreatePaymentSession {
  readonly secret: string
  create(user: UserModel, games: GameModel): Promise<string>
}