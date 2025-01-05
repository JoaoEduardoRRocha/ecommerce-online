// import { UpdateUserMongoRepository } from '../../../infra/db/mongodb/user/update-user'
// import { GetUserMongoRepository } from '../../../infra/db/mongodb/user/get-user'
// import { FirstAccessLoginController } from '../../../presentation/controllers/user/first-access-login'
// import { UserSignerAdapter } from '../../../utils/user/user-signer-adapter'
// import env from '../../config/env'
// import { AddNotificationMongoRepository } from '../../../infra/db/mongodb/notification/add-notification';

// export const makeFirstAccessLoginController = (): FirstAccessLoginController => {
// const getUserMongoRepository = new GetUserMongoRepository()
//   const updateUserMongoRepository = new UpdateUserMongoRepository()
//   const secret = env.jwtSecret
//   const userSignerAdapter = new UserSignerAdapter(secret)
//   const notificationAdder = new AddNotificationMongoRepository()
//   const firstAccessLoginController = new FirstAccessLoginController(getUserMongoRepository, updateUserMongoRepository, userSignerAdapter, notificationAdder)
//   return firstAccessLoginController
// }