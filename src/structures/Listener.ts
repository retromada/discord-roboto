import type { TextChannel } from 'discord.js'
import keyBy from 'lodash/keyBy'
import type { Logger } from 'pino'

import {
  IDefaultOptions,
  IListenerOptions,
  INotifyChannelsOptions
} from '@interfaces'
import { optionHandler } from '@utils'

import type Retromada from './base/Retromada'

export default class Listener {
  public client: Retromada
  public logger: Logger
  public options: IDefaultOptions
  public unifiedEvents: boolean
  public events: string[]
  public eventsByKey: { [key: string]: string }

  constructor (client: Retromada, options: IListenerOptions | any = {}) {
    this.client = client
    this.logger = client.logger
    this.options = client.defaultOptions

    options = optionHandler('Listener', options)

    this.unifiedEvents = options.default('unifiedEvents', false)
    this.events = options.optional('events')

    this.eventsByKey = keyBy(this.events)
  }

  public notifyChannels (
    { event, action, channel, guild }: INotifyChannelsOptions,
    callback: (channel: TextChannel) => void
  ) {
    this.options.notifyChannels.forEach(({ channelId, actions }) => {
      if (channel.id !== channelId && actions[action]) {
        guild.channels
          .fetch(channelId)
          .then(callback)
          .catch((error) =>
            this.logger.error({ labels: [event] }, error.message)
          )
      }
    })
  }
}
