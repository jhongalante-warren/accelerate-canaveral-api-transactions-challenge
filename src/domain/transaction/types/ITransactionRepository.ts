import { Transaction } from '@domain/transaction/entities/Transaction'

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<Transaction>
}
