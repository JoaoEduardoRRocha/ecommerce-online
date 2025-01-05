import { UserModel } from '../../../../domain/models/user/user'
import { MongoHelper } from '../helpers/mongo-helper'

export class UpdateUserMongoRepository implements UpdateUserMongoRepository {
  async update (user: UserModel): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.findOneAndUpdate(
      { _id: user.id },
      {
        $set: {
          password: user.password,
          name: user.name,
          email: user.email,
        }
      },
      { returnDocument: 'after' }
    )
    return result.value
  }
}
