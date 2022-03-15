import { Express } from 'express'
import { createServer } from '@warrenbrasil/api-node-toolkit'
import bodyParser from 'body-parser'

import { Config } from '@config/Config'
import { tokens } from '@di/tokens'

import { inject, injectable } from 'tsyringe'
import { Routes } from './Routes'
import { Logger } from '@logger/Logger'
import globalHandlingErrors from './middlewares/globalHandlingErrors'
import IServer from '@warrenbrasil/api-node-toolkit/dist/src/server/IServer'

@injectable()
export class App {
  public server: IServer
  constructor(
    @inject(tokens.Config)
    private config: Config,

    @inject(tokens.Logger)
    private logger: Logger,

    @inject(tokens.Routes)
    private routes: Routes
  ) {
    this.server = createServer(config.get())
    this.server.use(bodyParser.json())

    this.setupRoutes()
    this.setupErrors()
  }

  public getApp(): Express {
    return this.getServer().getApp()
  }

  public getServer(): IServer {
    return this.server
  }

  private setupRoutes() {
    this.server.use(this.routes.setupRouter())
  }

  private setupErrors() {
    this.server.use(globalHandlingErrors)
  }
  /**
   * Listens to specified port and starts the application.
   */
  public listen() {
    this.logger.info('Starting appplication')
    const { port } = this.config.get()

    this.server.listen(port)

    return this
  }
}
