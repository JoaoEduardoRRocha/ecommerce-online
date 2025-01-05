import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeUpdateGameController } from '../../factories/game/update-game'

export default (router: Router): void => {
  router.put('/api/games/:id', adaptRoute(makeUpdateGameController()))
}
