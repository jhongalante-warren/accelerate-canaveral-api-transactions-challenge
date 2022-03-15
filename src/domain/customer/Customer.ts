import { ObjectId } from 'mongodb'

interface IPortfolio {
  _id: string
  name: string
  amount: number
  goalAmount: number
  createdAt?: Date
  updatedAt?: Date
  isDeleted?: boolean
  deletedAt?: Date
}

export class Customer {
  private firstName: string | null = null
  private lastName: string | null = null
  private balance: number | null = null
  private portfolios!: IPortfolio[]
  private createdAt: Date = new Date()
  private updatedAt: Date = new Date()

  constructor(
    firstName: string,
    lastName: string,
    balance: number,
    portfolios: IPortfolio[]
  ) {
    this.setFirstName(firstName)
    this.setLastName(lastName)
    this.setBalance(balance)
    this.setPortfolios(portfolios)
  }

  public setFirstName(firstName: string) {
    this.firstName = firstName
  }
  public getFirstName() {
    return this.firstName
  }

  public setLastName(lastName: string) {
    this.lastName = lastName
  }
  public getLastName() {
    return this.lastName
  }

  public setBalance(balance: number) {
    this.balance = balance
  }
  public getBalance() {
    return this.balance
  }

  public setPortfolios(portfolios: IPortfolio[]) {
    portfolios.forEach((portfolio) => {
      portfolio._id = new ObjectId().toHexString()
      portfolio.createdAt = new Date()
      portfolio.updatedAt = new Date()
      portfolio.isDeleted = false
      portfolio.deletedAt = undefined
    })
    this.portfolios = portfolios
  }
  public getPortfolios() {
    return this.portfolios
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
