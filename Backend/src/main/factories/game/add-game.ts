import { AddGameMongoRepository } from '../../../infra/db/mongodb/game/add-game'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user/get-user'
import { AddGameController } from '../../../presentation/controllers/game/add-game'
import { UserDecoderAdapter } from '../../../utils/user/user-decoder-adapter'
import env from '../../config/env'

export const makeAddGameController = (): AddGameController => {
  const secret = env.jwtSecret
  const userGetter = new GetUserMongoRepository()
  const userDecoder = new UserDecoderAdapter(secret)
  const gameAdder = new AddGameMongoRepository()
  const addGameController = new AddGameController(userGetter, userDecoder, gameAdder)
  return addGameController
}
