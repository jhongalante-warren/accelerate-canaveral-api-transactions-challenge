import { ETransactionStatus } from 'shared/types/transaction/ETransactionStatus'
import { ETransactionType } from 'shared/types/transaction/ETransactionType'

export class Transaction {
  private id?: string
  private customerId?: string
  private type?: ETransactionType
  private status?: ETransactionStatus
  private amount?: number
  private fromPortfolioId?: string
  private toPortfolioId?: string
  private toCustomerId?: string
  private createdAt?: Date
  private updatedAt?: Date

  constructor(
    id: string,
    customerId: string,
    type: ETransactionType,
    status: ETransactionStatus,
    amount: number,
    fromPortfolioId: string,
    toPortfolioId: string,
    toCustomerId: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.setCustomerId(customerId)
    this.setType(type)
    this.setStatus(status)
    this.setAmount(amount)
    this.setFromPortfolioId(fromPortfolioId)
    this.setToPortfolioId(toPortfolioId)
    this.setToCustomerId(toCustomerId)
    this.setCreatedAt(createdAt)
    this.setUpdatedAt(updatedAt)
  }

  public setCustomerId(customerId: string) {
    this.customerId = customerId
  }

  public getCustomerId() {
    return this.customerId
  }

  public setType(type: ETransactionType) {
    this.type = type
  }

  public getType() {
    return this.type
  }

  public setStatus(status: ETransactionStatus) {
    this.status = status
  }

  public getStatus() {
    return this.status
  }

  public setAmount(amount: number) {
    this.amount = amount
  }

  public getAmount() {
    return this.amount
  }

  public setFromPortfolioId(fromPortfolioId: string) {
    this.fromPortfolioId = fromPortfolioId
  }

  public getFromPortfolioId() {
    return this.fromPortfolioId
  }

  public setToPortfolioId(toPortfolioId: string) {
    this.toPortfolioId = toPortfolioId
  }

  public getToPortfolioId() {
    return this.toPortfolioId
  }

  public setToCustomerId(toCustomerId: string) {
    this.toCustomerId = toCustomerId
  }

  public getToCustomerId() {
    return this.toCustomerId
  }

  public setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt
  }

  public getCreatedAt() {
    return this.createdAt
  }

  public setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt
  }

  public getUpdatedAt() {
    return this.updatedAt
  }
}
