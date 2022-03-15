import { ITransactionRepository } from '@domain/transaction/types/ITransactionRepository'
import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'
import { Transaction } from '../entities/Transaction'

@injectable()
export class TransactionService {
  constructor(
    @inject(tokens.TransactionRepository)
    private transactionRepository: ITransactionRepository
  ) {}

  public create(transaction: Transaction) {
    this.transactionRepository.create(transaction)
  }
}
