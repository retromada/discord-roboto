import { resolve } from 'path'

import File from '@utils/File'

import type Retromada from './base/Retromada'

export default abstract class Loader {
  client: Retromada
  abstract loadFile(file, filename: string): void

  constructor (client: Retromada) {
    this.client = client
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
