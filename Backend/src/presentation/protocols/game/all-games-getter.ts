import { GameModel } from '../../../domain/models/game/game'
import { GetAllGames } from '../../../domain/usecases/game/get-all-games'

export interface AllGamesGetter extends GetAllGames {
    getAll(): Promise<GameModel[]>
}
