import type { TextChannel } from 'discord.js'
import keyBy from 'lodash/keyBy'
import type { Logger } from 'pino'

import {
  IDefaultOptions,
  IListenerOptions,
  INotifyChannelsOptions,
  IOptionHandler
} from '@interfaces'
import { optionHandler } from '@utils'

import type Retromada from './base/Retromada'

export default class Listener {
  private listenerOptions: IOptionHandler
  public unifiedEvents: boolean
  public events: string[]
  public client: Retromada
  public logger: Logger
  public options: IDefaultOptions
  public eventsByKey: { [key: string]: string }

  constructor (client: Retromada, options: IListenerOptions = {}) {
    this.listenerOptions = optionHandler('Listener', options)

    this.unifiedEvents = this.listenerOptions.default('unifiedEvents', false)
    this.events = this.listenerOptions.optional('events')

    this.client = client
    this.logger = client.logger
    this.options = client.defaultOptions

    this.eventsByKey = keyBy(this.events)
  }

  public notifyChannels (
    { event, action, channel, guild }: INotifyChannelsOptions,
    callback: (channel: TextChannel) => void
  ) {
    this.options.notifyChannels.forEach(({ channelId, actions }) => {
      if (channel?.id !== channelId && actions[action]) {
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
