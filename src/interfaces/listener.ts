import type { Guild, TextChannel } from 'discord.js'

import { ChannelAction } from '@utils/Enums'

export interface IListenerOptions {
  unifiedEvents?: boolean
  events?: string[]
}

export interface INotifyChannelsOptions {
  event: string
  action: ChannelAction
  channel?: TextChannel
  guild: Guild
}
