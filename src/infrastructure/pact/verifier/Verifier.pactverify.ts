'use strict'
jest.autoMockOff()
import 'reflect-metadata'
import { Verifier, VerifierOptions } from '@pact-foundation/pact'
import * as cp from 'child_process'
import { Config } from '@config/Config'
import { container } from '@di/container'
import { tokens } from '@di/tokens'
import IServer from '@warrenbrasil/api-node-toolkit/dist/src/server/IServer'

interface Package {
  name: string
}
const pjson: Package = require('package.json')

const config = new Config()
const {
  port,
  pact: { broker, username, password },
} = config.get()
const app: IServer = container.resolve(tokens.App)

const getBranch = () => {
  try {
    return cp.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
  } catch (Error) {
    throw new TypeError("Couldn't find a git branch, is this a git directory?")
  }
}

const opts: VerifierOptions = {
  provider: pjson.name,
  providerBaseUrl: `http://localhost:${port}`,
  pactBrokerUrl: broker,
  pactBrokerUsername: username,
  pactBrokerPassword: password,
  publishVerificationResult: true,
  providerVersion: getBranch(),
}

describe('Contract verifying', () => {
  beforeAll(async () => {
    await app.listen(port)
  })
  it('Should validate contracts', async () => {
    await new Verifier(opts).verifyProvider()
  })
})
