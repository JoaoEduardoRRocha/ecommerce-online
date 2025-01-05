import { MissingParamError, UnauthorizedError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { GameGetter } from '../../protocols/game/game-getter'

export class GetGameController implements Controller {
  private readonly gameGetter: GameGetter

  constructor(gameGetter: GameGetter) {

    this.gameGetter = gameGetter
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const gameId = httpRequest.params?.id
      if (!gameId) {
        return badRequest(new MissingParamError('id'))
      }

      const game = await this.gameGetter.getById(gameId)
      if (!game) {
        return badRequest(new MissingParamError('Game not found'))
      }

      return ok(game)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
