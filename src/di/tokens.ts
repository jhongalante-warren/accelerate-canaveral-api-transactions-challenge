export const tokens = {
  // App general
  Config: Symbol('Config'),
  Logger: Symbol('Logger'),
  Routes: Symbol('Routes'),
  App: Symbol('App'),

  // Infrastructure
  MongoDBClient: Symbol('MongoDBClient'),
  DocsService: Symbol('DocsService'),
  StatusService: Symbol('StatusService'),

  // Presentation
  DocsController: Symbol('DocsController'),
  StatusController: Symbol('StatusController'),
  CustomerController: Symbol('CustomerController'),
  CreateCustomerController: Symbol('CreateCustomerController'),
  CustomerMiddleware: Symbol('CustomerMiddleware'),
  CustomerRouter: Symbol('CustomerRouter'),

  // Domain
  CustomerRepository: Symbol('CustomerRepository'),
  CustomerService: Symbol('CustomerService'),
  TransactionRepository: Symbol('TransactionRepository'),
  TransactionService: Symbol('TransactionService'),

  // New Controller Handler
  CustomerControllerHandler: Symbol('CustomerControllerHandler'),
}
