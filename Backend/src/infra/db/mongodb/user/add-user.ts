import { UserModel } from '../../../../domain/models/user/user'
import { AddUser, AddUserModel } from '../../../../domain/usecases/user/add-user'
import { MongoHelper } from '../helpers/mongo-helper'

export class AddUserMongoRepository implements AddUser {
  async add (userData: AddUserModel): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.insertOne(userData)
    return result.ops[0]
  }
}
