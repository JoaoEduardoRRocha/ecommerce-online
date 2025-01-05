import { GameModel } from '../../../../domain/models/game/game'
import { UpdateGame } from '../../../../domain/usecases/game/update-game'
import { MongoHelper } from '../helpers/mongo-helper'

export class UpdateGameMongoRepository implements UpdateGame {
  async update(game: GameModel): Promise<GameModel> {
    const gameCollection = await MongoHelper.getCollection('games')
    const result = await gameCollection.findOneAndUpdate(
      { _id: new MongoHelper.ObjectId(game.id) },
      {
        $set: {
          image: game.image,
          name: game.name,
          gender: game.gender,
          description: game.description,
          price: game.price,
          discountPrice: game.discountPrice,
        },
      },
      { returnDocument: 'after' } 
    )

    return result.value
  }
}
