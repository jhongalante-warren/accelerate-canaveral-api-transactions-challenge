import { Customer } from '@domain/customer/Customer'

export interface ICustomerRepository {
  create(customer: Customer): Promise<Customer>
}
