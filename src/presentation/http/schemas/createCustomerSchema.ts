import Joi from 'joi'

const createCustomerSchema = Joi.object({
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    balance: Joi.number().required(),
    portfolios: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        amount: Joi.number().positive().required(),
        goalAmount: Joi.number().positive().required(),
      })
    ),
  }).required(),
})

export default createCustomerSchema
