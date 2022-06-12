import type {
  Guild,
  GuildMember,
  Interaction,
  TextBasedChannel,
  User
} from 'discord.js'

export default class Context {
  public interaction: Interaction
  public guild: Guild
  public channel: TextBasedChannel
  public member: GuildMember
  public user: User

  constructor (options) {
    this.interaction = options.interaction
    this.guild = options.interaction.guild
    this.channel = options.interaction.channel
    this.member = options.interaction.member
    this.user = options.interaction.user
  }
}
