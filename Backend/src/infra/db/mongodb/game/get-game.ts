import { GameModel } from '../../../../domain/models/game/game'
import { GetGame } from '../../../../domain/usecases/game/get-game'
import { MongoHelper, mongoToGameModel } from '../helpers/mongo-helper'

export class GetGameMongoRepository implements GetGame {
  async getById(_id: string): Promise<GameModel> {
    const gameCollection = await MongoHelper.getCollection('games')
    if (!MongoHelper.ObjectId.isValid(_id)) {
      throw new Error('Invalid ID format')
    }
    const game = await gameCollection.findOne({ _id: new MongoHelper.ObjectId(_id) })
    if (!game) return null
    return mongoToGameModel(game)
  }
}
