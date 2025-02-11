import { InvalidParamError, MissingParamError, UnauthorizedError, UserNotFoundError } from '../../errors'
import { badRequest, ok, serverError, unauthorized, userNotFound, userNotVerified } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { EmailValidator, UserDecoder, UserGetter, UserSigner } from '../../protocols/user'
import { Encrypter } from '../../protocols/user/encrypter'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly userGetter: UserGetter
  private readonly encrypter: Encrypter
  private readonly userSigner: UserSigner
  private readonly userDecoder: UserDecoder

  constructor (emailValidator: EmailValidator, userGetter: UserGetter, encrypter: Encrypter, userSigner: UserSigner, userDecoder: UserDecoder) {
    this.emailValidator = emailValidator
    this.userGetter = userGetter
    this.encrypter = encrypter
    this.userSigner = userSigner
    this.userDecoder = userDecoder
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const user = await this.userGetter.getByEmail(email)
      if (!user) {
        return userNotFound(new UserNotFoundError())
      }

      const isValidPassword = await this.encrypter.compare(password, user.password)
      if (!isValidPassword) {
        return unauthorized(new UnauthorizedError())
      }
      const accessToken = this.userSigner.sign(user)

      return ok({
        accessToken
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
