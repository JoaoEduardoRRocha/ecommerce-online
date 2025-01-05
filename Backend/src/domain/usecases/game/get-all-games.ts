import { GameModel } from '../../models/game/game'

export interface GetAllGames {
  getAll (): Promise<GameModel[]>
}
