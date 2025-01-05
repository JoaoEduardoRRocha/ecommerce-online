import { AddUserMongoRepository } from '../../../infra/db/mongodb/user/add-user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user/get-user'
import { SignUpController } from '../../../presentation/controllers/user/signup'
import { BcryptAdapter, EmailValidatorAdapter } from '../../../utils/user'

export const makeSignUpController = (): SignUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const getUserMongoRepository = new GetUserMongoRepository()
  const addUserMongoRepository = new AddUserMongoRepository()
  const salt = 12
  const encrypterAdapter = new BcryptAdapter(salt)
  const signUpController = new SignUpController(emailValidatorAdapter, getUserMongoRepository, addUserMongoRepository, encrypterAdapter)
  return signUpController
}

