import { tokens } from '@di/tokens'

import { MongoDBClient } from '@infrastructure/mongodb/MongoDBClient'
import { inject, injectable } from 'tsyringe'

import { Customer } from '@domain/customer/Customer'
import { ICustomerRepository } from '@domain/customer/types/ICustomerRepository'

@injectable()
export class MongoDBCustomerRepository implements ICustomerRepository {
  private collection: string

  constructor(
    @inject(tokens.MongoDBClient)
    private client: MongoDBClient
  ) {
    this.collection = client.getCollectionName('customer')
  }

  async create(customer: Customer): Promise<Customer> {
    const db = await this.client.getInstance()
    const customerCollection = await db.collection(this.collection)

    const result = await customerCollection.insertOne(customer)

    if (!result.result.ok) {
      throw new Error('Error on inserting customer')
    }

    return customer
  }
}
