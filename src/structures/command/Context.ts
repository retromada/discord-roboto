import type {
  CommandInteraction,
  Guild,
  GuildMember,
  GuildTextBasedChannel,
  User
} from 'discord.js'

import { ICommandContextOptions } from '@interfaces'

export default class Context {
  public interaction: CommandInteraction
  public guild: Guild
  public channel: GuildTextBasedChannel
  public member: GuildMember | any
  public user: User

  constructor (options: ICommandContextOptions) {
    this.interaction = options.interaction
    this.guild = options.interaction.guild
    this.channel = options.interaction.channel
    this.member = options.interaction.member
    this.user = options.interaction.user
  }
}
