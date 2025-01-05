import { UserModel } from '../../models/user/user'

export interface AddUserModel {
  name: string
  email: string
  password: string
  createdAt: Date
}

export interface AddUser {
  add: (user: AddUserModel) => Promise<UserModel>
}