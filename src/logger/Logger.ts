import WarrenLogger from '@warrenbrasil/ts-logger-provider'

interface Package {
  name: string
}

const pkg: Package = require('../../package.json')

/**
 * A logger abstraction on top of logger provided by `@warrenbrasil/logger`,
 * with the addiction of package name (from `package.json`) as the main prefix.
 */
export class Logger extends WarrenLogger {
  constructor() {
    super(pkg.name)
  }
}
