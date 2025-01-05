import { MissingParamError, UnauthorizedError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { UserDecoder } from '../../protocols/user/user-decoder'
import { UserGetter } from '../../protocols/user'
import { GameDeleter } from '../../protocols/game/game-deleter'

export class DeleteGameController implements Controller {
  private readonly userGetter: UserGetter
  private readonly userDecoder: UserDecoder
  private readonly gameDeleter: GameDeleter

  constructor(userGetter: UserGetter, userDecoder: UserDecoder, gameDeleter: GameDeleter) {
    this.userGetter = userGetter
    this.userDecoder = userDecoder
    this.gameDeleter = gameDeleter
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

      const gameId = httpRequest.params?.id
      if (!gameId) {
        return badRequest(new MissingParamError('id'))
      }

      await this.gameDeleter.delete(gameId)
      return ok({ message: 'Game deleted successfully' })
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
