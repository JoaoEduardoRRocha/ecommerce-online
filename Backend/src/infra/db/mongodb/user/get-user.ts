import { UserModel } from '../../../../domain/models/user/user'
import { GetUser } from '../../../../domain/usecases/user/get-user'
import { MongoHelper, mongoToUserModel } from '../helpers/mongo-helper'

export class GetUserMongoRepository implements GetUser {
  async getById(_id: string): Promise<UserModel> {
    console.log(_id)
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ _id: new MongoHelper.ObjectId(_id) })
    if (!user) return null
    return mongoToUserModel(user)
  }

  async getByEmail(email: string): Promise<UserModel | null> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ email })
    if (!user) return null
    return mongoToUserModel(user)
  }
}
