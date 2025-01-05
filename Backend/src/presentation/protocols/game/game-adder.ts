import { GameModel } from '../../../domain/models/game/game'
import { AddGame, AddGameModel } from '../../../domain/usecases/game/add-game'

export interface GameAdder extends AddGame {
    add(game: AddGameModel): Promise<GameModel>
}