import { MongoClient, Collection, ObjectId } from 'mongodb'
import { UserModel } from '../../../../domain/models/user/user'
import { GameModel } from '../../../../domain/models/game/game'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useUnifiedTopology: true,
    })
  },

  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null as unknown as MongoClient
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map<T>(data: any, mapper: (doc: any) => T): T | null {
    if (!data) return null
    return mapper(data)
  },

  mapArray<T>(data: any[], mapper: (doc: any) => T): T[] {
    return data.map(mapper)
  },

  ObjectId,
}

export const mongoToUserModel = (data: any): UserModel => {
  return {
    id: data._id.toHexString(),
    name: data.name,
    email: data.email,
    password: data.password,
    passwordConfirmation: data.passwordConfirmation,
    isAdmin: !!data.isAdmin,
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
  }
}

export const mongoToGameModelArray = (data: any[]): GameModel[] => {
  return data.map((game) => ({
    id: game._id.toHexString(),
    image: game.image,
    name: game.name,
    gender: game.gender,
    description: game.description,
    price: game.price,
    discountPrice: game.discountPrice,
    createdAt: game.createdAt ? new Date(game.createdAt) : new Date(),
  }))
}

export const mongoToGameModel = (data: any): GameModel => {
  return {
    id: data._id.toHexString(),
    image: data.image,
    name: data.name,
    gender: data.gender,
    description: data.description,
    price: data.price,
    discountPrice: data.discountPrice,
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
  }
}

export const mongoToUserModelArray = (data: any[]): UserModel[] => {
  return data.map(mongoToUserModel)
}

