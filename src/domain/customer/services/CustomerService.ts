import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'
import { ICustomerRepository } from '@domain/customer/types/ICustomerRepository'
import { ICustomerService } from '@domain/customer/types/ICustomerService'
import { Customer } from '@domain/customer/Customer'

@injectable()
export class CustomerService implements ICustomerService {
  constructor(
    @inject(tokens.CustomerRepository)
    private customerRepository: ICustomerRepository
  ) {}

  public create(customer: Customer) {
    return this.customerRepository.create(customer)
  }
}
