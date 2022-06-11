import { Command, SlashCommandBuilder } from '@structures/command'

export default class Ping extends Command {
  constructor (client) {
    super({ name: 'ping', category: 'bot' }, client)
  }

  public static data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('pong')

  public async execute ({ interaction }) {
    return await interaction.reply(`${~~this.client.ws.ping}ms`)
  }
}
