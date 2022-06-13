import { resolve } from 'path'
import type { Logger } from 'pino'

import File from '@utils/File'

import type Retromada from './base/Retromada'

export default abstract class Loader {
  public client: Retromada
  public logger: Logger
  public abstract loadFile(file, filename: string): void

  constructor (client: Retromada) {
    this.client = client
    this.logger = client.logger
  }

  public async loadFiles (path: string, options?) {
    await File.requireDirectory(
      path,
      (file, filename) => this.loadFile(file, filename),
      console.error,
      options
    )
  }

  public resolvePath (path: string) {
    return resolve(__dirname, '..', path)
  }
}
