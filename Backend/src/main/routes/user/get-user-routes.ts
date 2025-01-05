import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeGetUserController } from '../../factories/user/get-user'

export default (router: Router): void => {
  router.get('/users/get-by-id/', adaptRoute(makeGetUserController()))
}
