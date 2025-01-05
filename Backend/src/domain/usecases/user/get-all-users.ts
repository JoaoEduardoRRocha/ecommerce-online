import { UserModel } from '../../models/user/user'

export interface GetAllUser {
  getAll (): Promise<UserModel[]>
}
