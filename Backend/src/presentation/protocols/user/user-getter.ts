import { UserModel } from '../../../domain/models/user/user'
import { GetUser } from '../../../domain/usecases/user/get-user'

export interface UserGetter extends GetUser {
  getById (_id: string): Promise<UserModel>
  getByEmail (email: string): Promise<UserModel>
}
