import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class DeleteUserMongoRepository implements DeleteUserMongoRepository {
  async delete (id: string): Promise<any> {
    const userCollection = await MongoHelper.getCollection('users')
    const userIdObjectId = new ObjectId(id)
    const result = await userCollection.deleteOne({ _id: userIdObjectId })
    return result.deletedCount
  }
}
