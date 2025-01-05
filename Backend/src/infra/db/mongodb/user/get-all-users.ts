import { UserModel } from '../../../../domain/models/user/user'
import { GetAllUser } from '../../../../domain/usecases/user/get-all-users'
import { MongoHelper, mongoToUserModelArray } from '../helpers/mongo-helper'

export class GetAllUsersMongoRepository implements GetAllUser {
  async getAll(): Promise<UserModel[]> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.find().toArray()
    const parsedResult = mongoToUserModelArray(result)
    return parsedResult
  }
}
