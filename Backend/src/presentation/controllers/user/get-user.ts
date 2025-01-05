import { MissingParamError, UnauthorizedError, UserNotFoundError } from '../../errors'
import { badRequest, ok, serverError, unauthorized, userNotFound } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { UserDecoder } from '../../protocols/user/user-decoder'
import { UserGetter } from '../../protocols/user'

export class GetUserController implements Controller {
  private readonly userDecoder: UserDecoder
  private readonly userGetter: UserGetter

  constructor(userDecoder: UserDecoder, userGetter: UserGetter) {
    this.userGetter = userGetter
    this.userDecoder = userDecoder
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body?.id) {
        return badRequest(new MissingParamError('id'))
      }

      const accessToken =
        httpRequest.headers['access-token'] || httpRequest.headers['Access-Token']
      if (!accessToken) {
        return badRequest(new MissingParamError('access-token'))
      }

      const userId = this.userDecoder.decode(accessToken)
      if (!userId) {
        return unauthorized(new UnauthorizedError())
      }

      const user = await this.userGetter.getById(userId)
      if (!user) {
        return userNotFound(new UserNotFoundError())
      }

      return ok(user)
    } catch (error) {
      console.error('Error in GetUserController:', error)
      return serverError(error)
    }
  }
}
