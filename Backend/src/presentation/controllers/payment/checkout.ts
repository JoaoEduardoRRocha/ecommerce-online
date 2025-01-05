import { HttpRequest, HttpResponse } from '../../protocols/http';
import { UserDecoder } from '../../protocols/user/user-decoder';
import { UserGetter } from '../../protocols/user/user-getter';
import { badRequest, ok, serverError } from '../../helpers/http-helpers';
import { MissingParamError } from '../../errors/missing-param-error';
import { UserNotFoundError } from '../../errors/user-not-found-error';
import { PaymentSessionCreator } from '../../protocols/payments/payment-session-creator'
import { GameGetter } from '../../protocols/game/game-getter'

export class CheckoutController {
  constructor(
    private readonly userDecoder: UserDecoder,
    private readonly userGetter: UserGetter,
    private readonly gameGetter: GameGetter,
    private readonly paymentSessionCreator: PaymentSessionCreator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { gameId } = httpRequest.body;

      if (!gameId) {
        return badRequest(new MissingParamError('gameId'));
      }

      if (!httpRequest.headers) {
        return badRequest(new MissingParamError('access-token'));
      }

      const accessToken = httpRequest.headers['access-token'];
      if (!accessToken) {
        return badRequest(new MissingParamError('access-token'));
      }

      const userId = this.userDecoder.decode(accessToken);
      const user = await this.userGetter.getById(userId);

      if (!user) {
        return badRequest(new UserNotFoundError());
      }
      const game = await this.gameGetter.getById(gameId);

      const sessionURL = await this.paymentSessionCreator.create(user, game);
      return ok(sessionURL);
    } catch (error) {
      console.log(error)
      return serverError(error);
    }
  }
}
