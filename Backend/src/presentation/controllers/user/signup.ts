import { InvalidParamError, MissingParamError, RegisteredCustomerError } from '../../errors'
import { InvalidEmailError } from '../../errors/invalid-email-error'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { UserAdder, UserGetter, EmailValidator, Controller, Encrypter } from '../../protocols/user'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly userGetter: UserGetter
  private readonly userAdder: UserAdder
  private readonly encrypter: Encrypter
  
  constructor(
    emailValidator: EmailValidator, userGetter: UserGetter, userAdder: UserAdder, encrypter: Encrypter ) {
    this.emailValidator = emailValidator
    this.userGetter = userGetter
    this.userAdder = userAdder
    this.encrypter = encrypter
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation, roleId } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidEmailError())
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const existingUser = await this.userGetter.getByEmail(email)
      if (existingUser) {
        return badRequest(new RegisteredCustomerError())
      }

      const createdAt = new Date()
      const encryptedPassword = await this.encrypter.hash(password)

      const user = await this.userAdder.add({
        name,
        email,
        password: encryptedPassword,
        createdAt
      })

      return ok({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      })
    } catch (error) {
      console.error('Erro no cadastro:', error)
      return serverError()
    }
  }
}