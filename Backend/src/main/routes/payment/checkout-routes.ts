import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeCheckoutController } from '../../factories/payment/checkout'

export default (router: Router): void => {
  router.post('/api/checkout/', adaptRoute(makeCheckoutController()))
}
