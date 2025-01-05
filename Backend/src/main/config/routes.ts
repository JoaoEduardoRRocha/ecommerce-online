import { Express, Router } from 'express'
import fg from 'fast-glob'

export default async (app: Express): Promise<void> => {
  const router = Router()
  app.use(router)

  const routeFiles = fg.sync('**/**-routes.**s')
  for (const file of routeFiles) {
    const routeModule = await import(`../../../${file}`)
    const routeHandler = routeModule.default || routeModule

    if (typeof routeHandler === 'function') {
      routeHandler(router)
    } else {
      console.error(`The route file ${file} does not export a valid function.`)
    }
  }
}
