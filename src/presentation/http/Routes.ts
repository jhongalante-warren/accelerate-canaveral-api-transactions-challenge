import { Response } from 'express'
import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'
import { Config } from '@config/Config'
import { DocsController } from '@presentation/http/controllers/DocsController'
import CustomerRouter from '@presentation/http/routes/CustomerRouter'
import { createRouter } from '@warrenbrasil/api-node-toolkit'
@injectable()
export class Routes {
  constructor(
    @inject(tokens.Config)
    private config: Config,

    @inject(tokens.DocsController)
    private docsController: DocsController,

    @inject(tokens.CustomerRouter)
    private customerRouter: CustomerRouter
  ) {}

  /**
   * Make domain routes available to application.
   */
  public setupRouter() {
    const router = createRouter('default-router')
    // Docs routes
    const { docs } = this.config.get()
    if (docs.enabled) {
      router.use('/docs', this.docsController.initDocs)
      router.get('/docs', this.docsController.makeDocs)
    }

    router.get('/v1/status', (_, res: Response) => {
      res.json({
        timestamp: new Date(),
      })
    })

    router.use('/api/customers', this.customerRouter.setup())

    return router
  }
}
