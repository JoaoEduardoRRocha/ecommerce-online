import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeGetAllUsersController } from '../../factories/user/get-all-users'

export default (router: Router): void => {
  router.get('/api/users/', adaptRoute(makeGetAllUsersController()))
}
