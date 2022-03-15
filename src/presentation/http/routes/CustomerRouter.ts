import { Request, Response, Router } from 'express'
import { inject, injectable } from 'tsyringe'
import { createRouter } from '@warrenbrasil/api-node-toolkit'
import schemaValidator from '@warrenbrasil/ts-express-validation-middleware'
import createCustomerSchema from '../schemas/createCustomerSchema'
import { CreateCustomerController } from '@presentation/http/controllers/customer/CreateCustomerController'
import { tokens } from '@di/tokens'

@injectable()
export default class CustomerRouter {
  private router: Router

  constructor(
    @inject(tokens.CreateCustomerController)
    private createCustomerController: CreateCustomerController
  ) {
    this.router = createRouter('customer-router')
  }

  public setup() {
    this.router.post(
      '/',
      schemaValidator(createCustomerSchema),
      (req: Request, res: Response) =>
        this.createCustomerController.handle(req, res)
    )

    return this.router
  }
}
