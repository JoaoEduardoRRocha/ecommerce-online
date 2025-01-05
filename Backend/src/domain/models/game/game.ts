export interface GameModel {
    id: string
    image: string
    name: string
    gender: string
    description: string
    price: number
    discountPrice?: number
    createdAt: Date
  }