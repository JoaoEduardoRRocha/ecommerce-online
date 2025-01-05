import { DeleteGameMongoRepository } from '../../../infra/db/mongodb/game/delete-game'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user/get-user'
import { DeleteGameController } from '../../../presentation/controllers/game/delete-game'
import { UserDecoderAdapter } from '../../../utils/user/user-decoder-adapter'
import env from '../../config/env'

export const makeDeleteGameController = (): DeleteGameController => {
  const secret = env.jwtSecret
  const userGetter = new GetUserMongoRepository()
  const userDecoder = new UserDecoderAdapter(secret)
  const gameDeleter = new DeleteGameMongoRepository()
  const deleteGameController = new DeleteGameController(userGetter, userDecoder, gameDeleter)
  return deleteGameController
}
