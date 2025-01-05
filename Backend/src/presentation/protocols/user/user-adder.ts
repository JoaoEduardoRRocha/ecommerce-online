import { UserModel } from '../../../domain/models/user/user'
import { AddUser, AddUserModel } from "../../../domain/usecases/user/add-user";

export interface UserAdder extends AddUser {
  add (user: AddUserModel): Promise<UserModel>
}
