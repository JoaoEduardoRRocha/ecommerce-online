import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeGetAllGamesController } from '../../factories/game/get-all-games'

export default (router: Router): void => {
  router.get('/api/games/', adaptRoute(makeGetAllGamesController()))
}
