import { UserModel } from '../../../domain/models/user/user'
import { UserSignerAdapter } from '../../../utils/user'

export interface UserSigner extends UserSignerAdapter {
  secret: string
  sign (user: UserModel): string
}
