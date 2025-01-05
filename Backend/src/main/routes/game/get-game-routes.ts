import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeGetGameController } from '../../factories/game/get-game'

export default (router: Router): void => {
  router.get('/api/games/:id', adaptRoute(makeGetGameController()))
}
