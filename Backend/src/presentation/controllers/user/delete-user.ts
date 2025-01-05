import { MissingParamError, UnauthorizedError, UserNotFoundError } from '../../errors'
import { badRequest, ok, serverError, unauthorized, userNotFound } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { UserGetter, UserUpdater } from '../../protocols/user'
import { UserDecoder } from '../../protocols/user/user-decoder'
import { UserDeleter } from '../../protocols/user/user-deleter'

export class DeleteUserController implements Controller {
  private readonly userDecoder: UserDecoder
  private readonly userGetter: UserGetter
  private readonly userDeleter: UserDeleter

  constructor (userDecoder: UserDecoder, userGetter: UserGetter, userDeleter: UserDeleter) {
    this.userDecoder = userDecoder
    this.userGetter = userGetter
    this.userDeleter = userDeleter
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['id']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { id } = httpRequest.body


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

      const userToDelete = await this.userGetter.getById(id)
      if (!userToDelete) {
        return userNotFound(new UserNotFoundError())
      }

      const response = await this.userDeleter.delete(id)
    
      return ok({
        message: response
      })
    } catch (error) {
      return serverError()
    }
  }
}
