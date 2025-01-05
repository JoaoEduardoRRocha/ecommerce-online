import { UserModel } from '../../../domain/models/user/user'
import { GetAllUser } from '../../../domain/usecases/user/get-all-users'

export interface AllUsersGetter extends GetAllUser {
  getAll (): Promise<UserModel[]>
}
