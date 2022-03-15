import 'reflect-metadata'
import { Config } from '@config/Config'
import { App } from '@presentation/http/App'
import { container } from '@di/container'
import { tokens } from '@di/tokens'
import { MongoDBClient } from '@warrenbrasil/ts-mongodb-client'

const config = new Config()
const app = container.resolve(App)
const server = app.getServer()
/**
 * Start MongoDB
 */
if (config.get().mongoDB.uri) {
  server.startDatabase(container.resolve(tokens.MongoDBClient) as MongoDBClient)
}

app.listen()
