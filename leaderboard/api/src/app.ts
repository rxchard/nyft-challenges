import Koa from 'koa'
import helmet from 'koa-helmet'

import { ApolloServer } from 'apollo-server-koa'

import { connect } from './store/compass'
import { info, debug, error, warn } from './winston'
import { loadSchema } from './modules/graph/schema'

import { sync } from './modules/eth/sync'

async function server() {
  await connect()
  await sync.start()

  const schema = await loadSchema()

  const server = new ApolloServer({
    logger: { info, debug, error, warn },
    schema,
  })

  await server.start()

  const app = new Koa()
  if (process.env.NODE_ENV == 'production') app.use(helmet())

  server.applyMiddleware({ app, path: '/' })

  const port = 8080
  app.listen(port, () => info(`koa started, port ${port}`))
}

server().catch(error)
