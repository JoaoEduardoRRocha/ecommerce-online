import { GetUserMongoRepository } from '../../../infra/db/mongodb/user/get-user'
import { UpdateUserMongoRepository } from '../../../infra/db/mongodb/user/update-user'
import { ChangePasswordController } from '../../../presentation/controllers/user/change-password'
import { BcryptAdapter, UserDecoderAdapter } from '../../../utils/user'
import env from '../../config/env'

export const makeChangePasswordController = (): ChangePasswordController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const salt = 12
  const encrypterAdapter = new BcryptAdapter(salt)
  const updateUserMongoRepository = new UpdateUserMongoRepository()
  const changePasswordController = new ChangePasswordController(userDecoderAdapter, getUserMongoRepository, encrypterAdapter, updateUserMongoRepository)
  return changePasswordController
}
