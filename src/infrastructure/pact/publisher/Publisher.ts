import 'reflect-metadata'
import publisher, { PublisherOptions } from '@pact-foundation/pact-node'
import * as cp from 'child_process'
import { resolve } from 'path'
import { Config } from '@config/Config'
import { injectable } from 'tsyringe'
import { Logger } from '@logger/Logger'

const config = new Config()

@injectable()
export class PactPublisher {
  private logger?: Logger = new Logger()
  private opts!: PublisherOptions

  private getOpts() {
    const {
      pact: { broker, username, password },
    } = config.get()

    return {
      pactFilesOrDirs: [resolve(process.cwd(), 'pact/pacts')],
      pactBroker: broker,
      pactBrokerUsername: username,
      pactBrokerPassword: password,
      consumerVersion: this.getBranch(),
    }
  }

  private getBranch() {
    try {
      return cp.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
    } catch (error) {
      this.logger?.info('failed to get branch', error)
      throw new Error("Couldn't find a git branch, is this a git directory?")
    }
  }

  public performPublish() {
    this.opts = this.getOpts()
    publisher
      .publishPacts(this.opts)
      .then(() => {
        this.logger?.info('successfully published pacts')
        return process.exit(0)
      })
      .catch((error) => {
        this.logger?.info('failed to publish pacts', error)
        return process.exit(1)
      })
  }
}

new PactPublisher().performPublish()
