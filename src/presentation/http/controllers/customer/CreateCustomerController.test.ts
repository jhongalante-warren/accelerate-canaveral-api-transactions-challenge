import request, { Response } from 'supertest'
import { App } from '@presentation/http/App'
import { container } from '@di/container'

const appResolved = container.resolve(App)
const appInstance = appResolved.getApp()

const supertest = request(appInstance)

describe('Given the endpoint to create a customer', () => {
  describe('POST /api/customers', () => {
    let response: Response
    const newCustomer = {
      firstName: 'Jhonny',
      lastName: 'Doe',
      balance: 999,
      portfolios: [
        {
          name: 'Foo',
          amount: 999,
          goalAmount: 9999,
        },
      ],
    }

    beforeAll(async () => {
      response = await supertest.post('/api/customers').send(newCustomer)
    })

    it('Should return created', async () => {
      expect(response.status).toBe(201)
    })
  })
})
