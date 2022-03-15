import { inject, injectable } from 'tsyringe'
import { Request, Response } from 'express'

import { tokens } from '@di/tokens'
import { Logger } from '@logger/Logger'
import { Customer } from '@domain/customer/Customer'
import { ICustomerService } from '@domain/customer/types/ICustomerService'

@injectable()
export class CreateCustomerController {
  constructor(
    @inject(tokens.Logger)
    private logger: Logger,

    @inject(tokens.CustomerService)
    private customerService: ICustomerService
  ) {}

  /**
   * Creates an Customer entity.
   */
  public async handle(request: Request, response: Response) {
    try {
      const { firstName, lastName, balance, portfolios } = request.body
      const customer = await this.customerService.create(
        new Customer(firstName, lastName, balance, portfolios)
      )

      response.status(201).send(customer)
    } catch (err) {
      this.logger.error(err)
      console.log(err)
      response.sendStatus(500)
    }
  }
}
