import { GameModel } from '../../../domain/models/game/game'
import { UpdateGame } from '../../../domain/usecases/game/update-game'

export interface GameUpdater extends UpdateGame {
    update(game: GameModel): Promise<GameModel>
}
