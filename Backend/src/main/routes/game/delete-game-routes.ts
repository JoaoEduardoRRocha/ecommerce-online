import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeDeleteGameController } from '../../factories/game/delete-game'

export default (router: Router): void => {
  router.delete('/games/:id', adaptRoute(makeDeleteGameController()))
}
