import { UnauthorizedError } from '../../errors'
import { ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { UserDecoder } from '../../protocols/user/user-decoder'
import { UserGetter } from '../../protocols/user'
import { AllGamesGetter } from '../../protocols/game/all-games-getter'

export class GetAllGamesController implements Controller {
  private readonly allGamesGetter: AllGamesGetter

  constructor( allGamesGetter: AllGamesGetter) {
    this.allGamesGetter = allGamesGetter
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const games = await this.allGamesGetter.getAll()
      return ok(games)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
