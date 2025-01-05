import { UserModel } from '../../../domain/models/user/user'
import { UpdateUser } from '../../../domain/usecases/user/update-user'

export interface UserUpdater extends UpdateUser {
  update (user: UserModel): Promise<UserModel>
}
