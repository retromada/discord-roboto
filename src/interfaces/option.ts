export interface INotifyChannel {
  channelId: string
  actions: { [key: string]: boolean }
}

export interface IDefaultOptions {
  notifyChannels: INotifyChannel[]
}
