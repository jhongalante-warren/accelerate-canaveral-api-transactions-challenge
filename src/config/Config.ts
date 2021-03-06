import dotenv from 'dotenv'
import { injectable } from 'tsyringe'

/**
 * A simple application configuration interface.
 */
interface Configuration {
  // HTTP port when running application
  port: number

  serviceName: string
  environment: string
  instance?: string

  observability: {
    endpoint: string
    enabled: boolean
    enableDebug?: boolean
    ignoreIncomingPaths?: string[]
  }

  logging: {
    enabled: boolean
    queueURL: string
  }

  docs: {
    enabled: boolean
  }

  mongoDB: {
    uri: string
    database: string
    prefix: string
  }

  pact: {
    broker: string
    username: string
    password: string
  }
}

/**
 * A simple injectable Config class, with a single `get` method that returns
 * the entire config.
 */
@injectable()
export class Config {
  private readonly config: Configuration

  constructor() {
    this.config = this.getConfigFromEnv()
  }

  public get() {
    return this.config
  }

  private getConfigFromEnv(): Configuration {
    dotenv.config()

    return {
      serviceName: process.env.SERVICE_NAME || 'no-name',
      environment: process.env.NODE_ENV || 'development',

      logging: {
        enabled: process.env.LOGGING_ENABLED === 'true',
        queueURL: process.env.LOGGING_QUEUE_URL || '',
      },

      docs: {
        enabled: process.env.DOCS_ENABLED === 'true',
      },

      observability: {
        enabled: process.env.OBSERVABILITY_TRACE_ENABLED === 'true',
        endpoint: process.env.OBSERVABILITY_JAEGER_ENDPOINT || '',
      },

      port: Number(process.env.PORT) || 80,

      mongoDB: {
        uri: process.env.MONGO_URL || process.env.MONGO_DB_URI || '',
        database: process.env.MONGO_DB_DATABASE || '',
        prefix: process.env.MONGO_DB_PREFIX || '',
      },

      pact: {
        broker: process.env.PACT_BROKER || '',
        username: process.env.PACT_USERNAME || '',
        password: process.env.PACT_PASSWORD || '',
      },
    }
  }
}
