import type { Logger } from 'pino'

import { optionHandler } from '@utils'

import type Retromada from './base/Retromada'

export default abstract class Route {
  public client: Retromada
  public logger: Logger
  public name: string
  public abstract register(http): void

  constructor (options, client) {
    this.client = client
    this.logger = client.logger

    options = optionHandler('Route', options)

    this.name = options.required('name')
  }

  public get path () {
    return '/api/' + this.name
  }
}
