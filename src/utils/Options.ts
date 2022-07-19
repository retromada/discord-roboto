import keyBy from 'lodash/keyBy'

import { IDefaultOptions } from '@interfaces'

import { ChannelAction } from './Enums'

export default class Options extends null {
  public static defaultOptions (): IDefaultOptions {
    return {
      notifyChannels: [
        {
          channelId: 'null',
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
