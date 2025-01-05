import { GameModel } from '../../models/game/game'

export interface UpdateGame {
  update (game: GameModel): Promise<GameModel>
}
