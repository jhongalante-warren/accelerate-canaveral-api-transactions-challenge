import { Transaction } from '@domain/transaction/entities/Transaction'
import { tokens } from '@di/tokens'
import { MongoDBClient } from '@infrastructure/mongodb/MongoDBClient'
import { ITransactionRepository } from '@domain/transaction/types/ITransactionRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class MongoTransactionRepository
  implements ITransactionRepository {
  private collection: string

  constructor(
    @inject(tokens.MongoDBClient)
    private client: MongoDBClient
  ) {
    this.collection = client.getCollectionName('transaction')
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const transactionCollection = await this.client.getCollection(
      this.collection
    )
    const result = await transactionCollection.insertOne(transaction)
    if (!result.result.ok) throw new Error('Error on creating transaction')

    return transaction
  }
}
