import { UserDecoderAdapter } from '../../../utils/user'

export interface UserDecoder extends UserDecoderAdapter {
  secret: string
  decode (accessToken: string): string
}
