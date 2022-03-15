import { inject, injectable, injectWithTransform } from 'tsyringe'

import { tokens } from '@di/tokens'
import { Config } from '@config/Config'
import { Logger } from '@logger/Logger'

import { MongoDBClient as WarrenMongoDBClient } from '@warrenbrasil/ts-mongodb-client'
import LoggerScopeTransformer from '@di/transformers/LoggerScopeTransformer'

/**
 * This is just a wrapper on top MongoDBClient provided by
 * [`@warrenbrasil/api-node-toolkit`](https://github.com/warrenbrasil/api-node-toolkit/blob/main/database/MongoDBClient.ts).
 */
@injectable()
export class MongoDBClient extends WarrenMongoDBClient {
  constructor(
    @inject(tokens.Config)
    config: Config,

    @injectWithTransform(
      tokens.Logger,
      LoggerScopeTransformer,
      'infrastructure:mongodb'
    )
    logger: Logger
  ) {
    super({
      logger,
      uri: config.get().mongoDB.uri,
      database: config.get().mongoDB.database,
      prefix: config.get().mongoDB.prefix,
    })
  }

  public async getCollection(collectionName: string) {
    const db = await this.getInstance()
    return db.collection(collectionName)
  }

  public async clearCollection(collectionName: string) {
    const collection = await this.getCollection(collectionName)
    await collection.deleteMany({})
  }
}
