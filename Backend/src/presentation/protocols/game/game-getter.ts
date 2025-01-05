import { GameModel } from '../../../domain/models/game/game'
import { GetGame } from '../../../domain/usecases/game/get-game'

export interface GameGetter extends GetGame {
    getById(id: string): Promise<GameModel>
}
