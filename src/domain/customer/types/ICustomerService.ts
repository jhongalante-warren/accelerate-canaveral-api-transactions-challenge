import { Customer } from '@domain/customer/Customer'

export interface ICustomerService {
  create(customer: Customer): Promise<Customer>
}
