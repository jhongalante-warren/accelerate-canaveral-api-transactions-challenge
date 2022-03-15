import { Logger } from '@logger/Logger'
import { Transform } from 'tsyringe/dist/typings/types'

export default class LoggerScopeTransformer
  implements Transform<Logger, Logger> {
  public transform(logger: Logger, context: string) {
    return logger.extend(context)
  }
}
