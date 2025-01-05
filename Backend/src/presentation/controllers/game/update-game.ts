import { MissingParamError, UnauthorizedError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { UserDecoder } from '../../protocols/user/user-decoder'
import { UserGetter } from '../../protocols/user'
import { GameUpdater } from '../../protocols/game/game-updater'

export class UpdateGameController implements Controller {
  private readonly userGetter: UserGetter
  private readonly userDecoder: UserDecoder
  private readonly gameUpdater: GameUpdater

  constructor(userGetter: UserGetter, userDecoder: UserDecoder, gameUpdater: GameUpdater) {
    this.userGetter = userGetter
    this.userDecoder = userDecoder
    this.gameUpdater = gameUpdater
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

      const requiredFields = ['id', 'image', 'name', 'gender', 'description', 'price']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const game = await this.gameUpdater.update(httpRequest.body)
      return ok(game)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
