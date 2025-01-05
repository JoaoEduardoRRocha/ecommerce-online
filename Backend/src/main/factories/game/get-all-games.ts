import { GetAllGamesMongoRepository } from '../../../infra/db/mongodb/game/get-all-games'
import { GetAllGamesController } from '../../../presentation/controllers/game/get-all-games'

export const makeGetAllGamesController = (): GetAllGamesController => {
  const allGamesGetter = new GetAllGamesMongoRepository()
  const getAllGamesController = new GetAllGamesController(allGamesGetter)
  return getAllGamesController
}
