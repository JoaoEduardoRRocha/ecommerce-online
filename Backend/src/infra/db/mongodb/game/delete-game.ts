import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class DeleteGameMongoRepository implements DeleteGameMongoRepository {
  async delete (id: string): Promise<any> {
    const gameCollection = await MongoHelper.getCollection('games')
    const gameIdObjectId = new ObjectId(id)
    const result = await gameCollection.deleteOne({ _id: gameIdObjectId })
    return result.deletedCount
  }
}
