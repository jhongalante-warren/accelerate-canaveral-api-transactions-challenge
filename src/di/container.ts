import { container } from 'tsyringe'
import { tokens } from '@di/tokens'
import { Config } from '@config/Config'
import { Logger } from '@logger/Logger'
import { Routes } from '@presentation/http/Routes'
import { MongoDBClient } from '@infrastructure/mongodb/MongoDBClient'

import { DocsController } from '@presentation/http/controllers/DocsController'
import { DocsService } from '@infrastructure/docs/DocsService'

import { MongoDBCustomerRepository as CustomerRepository } from '@domain/customer/infrastructure/MongoDBCustomerRepository'
import { CreateCustomerController } from '@presentation/http/controllers/customer/CreateCustomerController'
import { CustomerService } from '@domain/customer/services/CustomerService'
import CustomerRouter from '@presentation/http/routes/CustomerRouter'
import { ICustomerRepository } from '@domain/customer/types/ICustomerRepository'
import { ICustomerService } from '@domain/customer/types/ICustomerService'
import MongoTransactionRepository from '@domain/transaction/infrastructure/MongoTransactionRepository'
import { TransactionService } from '@domain/transaction/services/TransactionService'

// Creates a new child container based on root container
const childContainer = container.createChildContainer()

// App registers
childContainer.registerSingleton(tokens.Config, Config)
childContainer.registerSingleton(tokens.Logger, Logger)
childContainer.registerSingleton(tokens.Routes, Routes)
childContainer.registerSingleton<MongoDBClient>(
  tokens.MongoDBClient,
  MongoDBClient
)
// Docs
childContainer.registerSingleton(tokens.DocsController, DocsController)
childContainer.registerSingleton(tokens.DocsService, DocsService)
// Customer
childContainer.registerSingleton(tokens.CustomerRouter, CustomerRouter)
childContainer.registerSingleton(
  tokens.CreateCustomerController,
  CreateCustomerController
)
childContainer.registerSingleton<ICustomerRepository>(
  tokens.CustomerRepository,
  CustomerRepository
)
childContainer.registerSingleton<ICustomerService>(
  tokens.CustomerService,
  CustomerService
)
childContainer.registerSingleton(tokens.CustomerRepository, CustomerRepository)
childContainer.registerSingleton(tokens.CustomerService, CustomerService)

// Transaction
childContainer.registerSingleton(
  tokens.TransactionRepository,
  MongoTransactionRepository
)
childContainer.registerSingleton(tokens.TransactionService, TransactionService)

export { childContainer as container }
