import { GameModel } from "../../models/game/game"
import { UserModel } from "../../models/user/user"

export interface CreatePaymentSession {
  secret: string
  create(user: UserModel, games: GameModel): Promise<string>
}