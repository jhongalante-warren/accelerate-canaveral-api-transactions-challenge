import { tokens } from '@di/tokens'
import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import { Logger } from '@logger/Logger'

@injectable()
export class ExampleMiddleware {
  constructor(
    @inject(tokens.Logger)
    private logger: Logger
  ) {}

  /**
   * Handles middleware execution.
   */
  public async handle(req: Request, res: Response, next: NextFunction) {
    // Do your stuff here
    this.logger.log(req, res)
    next()
  }
}
