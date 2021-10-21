import Koa from 'koa'
import helmet from 'koa-helmet'

import { ApolloServer } from 'apollo-server-koa'
import { buildSchema } from 'type-graphql'

import { connect } from './store/compass'
import { info, debug, error, warn } from './winston'
import { ProfileResolver } from './modules/owner/Profile'

import { synchronize } from './modules/eth/sync'

async function server() {
  await connect()

  synchronize()

  const schema = await buildSchema({
    resolvers: [ProfileResolver],
  })

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
