export class Transaction {
  private type!: string
  private status!: string
  private amount!: number
  private fromPortfolio!: string
  private toPortfolio!: string
  private toCustomer!: string
  private createdAt: Date = new Date()
  private updatedAt: Date = new Date()

  constructor(
    type: string,
    status: string,
    amount: number,
    fromPortfolio: string,
    toPortfolio: string,
    toCustomer: string
  ) {
    this.setType(type)
    this.setStatus(status)
    this.setAmount(amount)
    this.setFromPortfolio(fromPortfolio)
    this.setToPortfolio(toPortfolio)
    this.setToCustomer(toCustomer)
  }

  public getType(): string {
    return this.type
  }

  public setType(type: string): void {
    this.type = type
  }

  public getStatus(): string {
    return this.status
  }

  public setStatus(status: string): void {
    this.status = status
  }

  public getAmount(): number {
    return this.amount
  }

  public setAmount(amount: number): void {
    this.amount = amount
  }

  public getFromPortfolio(): string {
    return this.fromPortfolio
  }

  public setFromPortfolio(fromPortfolio: string): void {
    this.fromPortfolio = fromPortfolio
  }

  public getToPortfolio(): string {
    return this.toPortfolio
  }

  public setToPortfolio(toPortfolio: string): void {
    this.toPortfolio = toPortfolio
  }

  public getToCustomer(): string {
    return this.toCustomer
  }

  public setToCustomer(toCustomer: string): void {
    this.toCustomer = toCustomer
  }

  public setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt
  }
  public getUpdatedAt() {
    return this.updatedAt
  }

  public setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt
  }
  public getCreatedAt() {
    return this.createdAt
  }
}
