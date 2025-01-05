import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    console.log('Database connected successfully!')

    const app = (await import('./config/app')).default

    app.listen(env.port, () => {
      console.log(`\uD83D\uDE80 Server is running at http://localhost:${env.port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to start the server:', error.message || error)
  })
