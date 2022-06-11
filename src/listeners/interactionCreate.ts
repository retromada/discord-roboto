import { Context } from '@structures/command'
import Listener from '@structures/Listener'

export default class InteractionCreate extends Listener {
  public commands: Map<string, any>

  constructor (client) {
    super(client)

    this.commands = client.commands
  }

  public async onInteractionCreate (interaction) {
    if (!interaction.isCommand()) return false
    if (!interaction.guildId || !interaction.channelId) return false
    if (!interaction.client.guilds.cache.get(interaction.guildId)) return false

    const commandName = interaction.commandName.toLowerCase()

    if (this.commands.has(commandName)) {
      const command = this.commands.get(commandName)
      const context = new Context({ interaction })

      command.executeCommand(context)
    }
  }
}
