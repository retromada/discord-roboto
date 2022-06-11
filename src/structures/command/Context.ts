import type { Interaction, TextBasedChannel } from 'discord.js'

export default class Context {
  public interaction: Interaction
  public channel: TextBasedChannel

  constructor (options) {
    this.interaction = options.interaction
    this.channel = options.interaction.channel
  }
}
