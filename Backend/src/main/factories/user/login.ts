import { UserDecoderAdapter } from './../../../utils/user/user-decoder-adapter';
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user/get-user'
import { LoginController } from '../../../presentation/controllers/user/login'
import { BcryptAdapter, EmailValidatorAdapter, UserSignerAdapter } from '../../../utils/user'
import env from '../../config/env'

export const makeLoginController = (): LoginController => {
  const emailValdatorAdapter = new EmailValidatorAdapter()
  const getUserMongoRepository = new GetUserMongoRepository()
  const salt = 12
  const encrypterAdapter = new BcryptAdapter(salt)
  const secret = env.jwtSecret
  const userSignerAdapter = new UserSignerAdapter(secret)
  const userDecoder = new UserDecoderAdapter(secret)
  const loginController = new LoginController(emailValdatorAdapter, getUserMongoRepository, encrypterAdapter, userSignerAdapter, userDecoder)
  return loginController
}
