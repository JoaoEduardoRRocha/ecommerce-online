import { GameModel } from '../../../../domain/models/game/game'
import { AddGame, AddGameModel } from '../../../../domain/usecases/game/add-game'
import { MongoHelper } from '../helpers/mongo-helper'

export class AddGameMongoRepository implements AddGame {
    async add (gameData:AddGameModel): Promise<GameModel> {
        const gameCollection = await MongoHelper.getCollection('games')
        const result = await gameCollection.insertOne(gameData)
        return result.ops[0]
    }
}