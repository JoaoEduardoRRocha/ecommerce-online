import { UserModel } from '../../models/user/user'

export interface GetUser {
  getById (id: string): Promise<UserModel>
  getByEmail (email: string): Promise<UserModel>
}
