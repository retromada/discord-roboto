import type { Interaction } from 'discord.js'

export default class Context {
  interaction: Interaction

  constructor (options) {
    this.interaction = options.interaction
  }
}
