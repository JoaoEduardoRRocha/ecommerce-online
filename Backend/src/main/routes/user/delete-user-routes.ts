import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeDeleteUserController } from '../../factories/user/delete-user'

export default (router: Router): void => {
  router.delete('/api/users/', adaptRoute(makeDeleteUserController()))
}
