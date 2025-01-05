import { EmailValidator } from '../../presentation/protocols/user'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    const isValid = validator.isEmail(email)
    return isValid
  }
}
