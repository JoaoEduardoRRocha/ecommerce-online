import { GetGameMongoRepository } from '../../../infra/db/mongodb/game/get-game'
import { GetGameController } from '../../../presentation/controllers/game/get-game'

export const makeGetGameController = (): GetGameController => {
  const gameGetter = new GetGameMongoRepository()
  const getGameController = new GetGameController(gameGetter)
  return getGameController
}
