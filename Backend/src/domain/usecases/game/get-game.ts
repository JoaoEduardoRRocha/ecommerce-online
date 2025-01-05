import { GameModel } from '../../models/game/game'

export interface GetGame {
  getById (id: string): Promise<GameModel>
}
