import Context from '@structures/command/Context'
import Listener from '@structures/Listener'

export default class InteractionCreate extends Listener {
  commands: Map<string, any>

  constructor (client) {
    super(client)

    this.commands = client.commands
  }

  public async onInteractionCreate (interaction) {
    if (!interaction.isCommand()) return false
    if (!interaction.guildId || !interaction.channelId) return false
    if (!interaction.client.guilds.cache.get(interaction.guildId)) return false

    const command = interaction.commandName.toLowerCase()

    if (this.commands.has(command)) {
      const context = new Context({ interaction })

      await interaction.reply(
        this.commands.get(command).executeCommand(context)
      )
    }
  }
}
