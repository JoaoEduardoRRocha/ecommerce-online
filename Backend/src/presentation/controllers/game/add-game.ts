import { InvalidParamError, MissingParamError, UnauthorizedError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { UserDecoder } from '../../protocols/user/user-decoder'
import { UserGetter } from '../../protocols/user'
import { GameAdder } from '../../protocols/game/game-adder'

export class AddGameController implements Controller {
  private readonly userGetter: UserGetter
  private readonly userDecoder: UserDecoder
  private readonly gameAdder: GameAdder

  constructor(userGetter: UserGetter, userDecoder: UserDecoder, gameAdder: GameAdder) {
    this.userGetter = userGetter
    this.userDecoder = userDecoder
    this.gameAdder = gameAdder
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['access-token']
      if (!accessToken) {
        return badRequest(new MissingParamError('access-token'))
      }

      const userId = this.userDecoder.decode(accessToken)
      if (!userId) {
        return unauthorized(new UnauthorizedError())
      }

      const user = await this.userGetter.getById(userId)
      if (!user) {
        return unauthorized(new UnauthorizedError('User not found'))
      }

      if (!user.isAdmin) {
        return unauthorized(new UnauthorizedError('User is not an admin'))
      }

      const requiredFields = ['image', 'name', 'gender', 'description', 'price']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { image, name, gender, description, price, discountPrice } = httpRequest.body

      const game = await this.gameAdder.add({
        image,
        name,
        gender,
        description,
        price,
        discountPrice,
        createdAt: new Date(),
      })

      return ok(game)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
