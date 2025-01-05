import { GameModel } from '../../../../domain/models/game/game'
import { GetAllGames } from '../../../../domain/usecases/game/get-all-games'
import { MongoHelper, mongoToGameModelArray } from '../helpers/mongo-helper'

export class GetAllGamesMongoRepository implements GetAllGames {
  async getAll(): Promise<GameModel[]> {
    const gameCollection = await MongoHelper.getCollection('games')
    const result = await gameCollection.find().toArray()
    const parsedResult: GameModel[] = mongoToGameModelArray(result)
    return parsedResult
  }
}
