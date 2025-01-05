import { UpdateGameMongoRepository } from '../../../infra/db/mongodb/game/update-game'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user/get-user'
import { UpdateGameController } from '../../../presentation/controllers/game/update-game'
import { UserDecoderAdapter } from '../../../utils/user/user-decoder-adapter'
import env from '../../config/env'

export const makeUpdateGameController = (): UpdateGameController => {
  const secret = env.jwtSecret
  const userGetter = new GetUserMongoRepository()
  const userDecoder = new UserDecoderAdapter(secret)
  const gameUpdater = new UpdateGameMongoRepository()
  const updateGameController = new UpdateGameController(userGetter, userDecoder, gameUpdater)
  return updateGameController
}
