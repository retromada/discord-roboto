import keyBy from 'lodash/keyBy'

import { IDefaultOptions } from '@interfaces'

import { ChannelAction } from './Enums'

const NotifyChannels = JSON.parse(process.env.NOTIFY_CHANNELS)

export default class Options extends null {
  public static defaultOptions (): IDefaultOptions {
    return {
      notifyChannels: [
        {
          channelId: NotifyChannels.MEMBERS,
          actions: keyBy([
            ChannelAction.MEMBER_JOIN,
            ChannelAction.MEMBER_LEAVE
          ])
        },
        {
          channelId: NotifyChannels.MESSAGES,
          actions: keyBy([
            ChannelAction.DELETE_MESSAGES,
            ChannelAction.UPDATE_MESSAGES,
            ChannelAction.BULK_DELETE_MESSAGES
          ])
        }
      ]
    }
  }
}
