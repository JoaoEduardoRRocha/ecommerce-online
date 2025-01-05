import { GetUserMongoRepository } from '../../../infra/db/mongodb/user/get-user'
import { GetMyUserController } from '../../../presentation/controllers/user/get-my-user'
import { UserDecoderAdapter } from '../../../utils/user/user-decoder-adapter'
import env from '../../config/env'

export const makeGetMyUserController = (): GetMyUserController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const getMyUserController = new GetMyUserController(userDecoderAdapter, getUserMongoRepository)
  return getMyUserController
}
