import { GameModel } from '../../models/game/game'

export interface AddGameModel {
  image: string
  name: string
  gender: string
  description: string
  price: number
  discountPrice?: number
  createdAt: Date
}

export interface AddGame {
  add: (game: AddGameModel) => Promise<GameModel>
}
