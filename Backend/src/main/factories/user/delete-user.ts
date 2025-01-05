import { DeleteUserMongoRepository } from '../../../infra/db/mongodb/user/delete-user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user/get-user'
import { DeleteUserController } from '../../../presentation/controllers/user/delete-user'
import { UserDecoderAdapter } from '../../../utils/user/user-decoder-adapter'
import env from '../../config/env'

export const makeDeleteUserController = (): DeleteUserController => {
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const getUserMongoRepository = new GetUserMongoRepository()
  const deleteUserMongoRepository = new DeleteUserMongoRepository()
  const getMyUserController = new DeleteUserController(userDecoderAdapter, getUserMongoRepository, deleteUserMongoRepository)
  return getMyUserController
}
