import { GetAllUsersMongoRepository } from '../../../infra/db/mongodb/user/get-all-users'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user/get-user'
import { GetAllUsersController } from '../../../presentation/controllers/user/get-all-users'
import { UserDecoderAdapter } from '../../../utils/user/user-decoder-adapter'
import env from '../../config/env'

export const makeGetAllUsersController = (): GetAllUsersController => {
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const getUserMongoRepository = new GetUserMongoRepository()
  const getAllUsersMongoRepository = new GetAllUsersMongoRepository()
  const getMyUserController = new GetAllUsersController(userDecoderAdapter, getUserMongoRepository, getAllUsersMongoRepository)
  return getMyUserController
}
