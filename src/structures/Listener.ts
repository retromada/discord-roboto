import type { Logger } from 'pino'

import { IListenerOptions } from '@interfaces'
import { optionHandler } from '@utils'

import type Retromada from './base/Retromada'

export default class Listener {
  public client: Retromada
  public logger: Logger
  public unifiedEvents: boolean
  public events: string[]

  constructor (client: Retromada, options: IListenerOptions | any = {}) {
    this.client = client
    this.logger = client.logger

    options = optionHandler('Listener', options)

    this.unifiedEvents = options.default('unifiedEvents', false)
    this.events = options.optional('events')
  }
}
