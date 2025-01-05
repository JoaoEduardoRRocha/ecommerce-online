import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeAddGameController } from '../../factories/game/add-game'

export default (router: Router): void => {
  router.post('/api/games/', adaptRoute(makeAddGameController()))
}
