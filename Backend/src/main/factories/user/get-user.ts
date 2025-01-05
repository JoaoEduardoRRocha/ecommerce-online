import { GetUserMongoRepository } from '../../../infra/db/mongodb/user/get-user'
import { GetUserController } from '../../../presentation/controllers/user/get-user'
import { UserDecoderAdapter } from '../../../utils/user/user-decoder-adapter'
import env from '../../config/env'

export const makeGetUserController = (): GetUserController => {
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const getUserMongoRepository = new GetUserMongoRepository()
  const getMyUserController = new GetUserController(userDecoderAdapter, getUserMongoRepository)
  return getMyUserController
}
