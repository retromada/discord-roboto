import { IDefaultOptions } from '@interfaces'

import { ChannelAction } from './Enums'

export default class Options extends null {
  public static defaultOptions (): IDefaultOptions {
    return {
      notifyChannels: [
        {
          channelId: 'null',
          actions: this.notifyChannelsActions([ChannelAction.DELETE_MESSAGES])
        }
      ]
    }
  }

  private static notifyChannelsActions (actions) {
    return actions.reduce(
      (accumulator, action) => ({
        ...accumulator,
        [this.snakeToCamel(ChannelAction[action])]: true
      }),
      {}
    )
  }

  private static snakeToCamel (value: string) {
    return value
      .toLowerCase()
      .replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace('-', '').replace('_', '')
      )
  }
}
