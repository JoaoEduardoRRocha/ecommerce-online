import { MissingParamError, UnauthorizedError, UserNotFoundError } from '../../errors'
import { badRequest, ok, serverError, unauthorized, userNotFound } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { UserDecoder } from '../../protocols/user/user-decoder'
import { UserGetter } from '../../protocols/user'
import { AllUsersGetter } from '../../protocols/user/all-users-getter'

export class GetAllUsersController implements Controller {
  private readonly userDecoder: UserDecoder
  private readonly userGetter: UserGetter
  private readonly allUsersGetter: AllUsersGetter

  constructor (userDecoder: UserDecoder, userGetter: UserGetter, allUsersGetter: AllUsersGetter) {
    this.userDecoder = userDecoder
    this.userGetter = userGetter
    this.allUsersGetter = allUsersGetter
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.headers) {
        return badRequest(new MissingParamError('access-token'))
      }

      const accessToken = httpRequest.headers['access-token']
      if (!accessToken) {
        return badRequest(new MissingParamError('access-token'))
      }

      const user = await this.userGetter.getById(this.userDecoder.decode(accessToken))
      if (!user) {
        return userNotFound(new UserNotFoundError())
      }

      const users = await this.allUsersGetter.getAll()
    
      return ok({
        users
      })
    } catch (error) {
      console.log(error);
      return serverError()
    }
  }
}
