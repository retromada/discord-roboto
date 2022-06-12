import { Command, SlashCommandBuilder } from '@structures/command'

export default class Echo extends Command {
  constructor (client) {
    super(
      {
        name: 'echo',
        category: 'developers',
        requirements: { developersOnly: true }
      },
      client
    )
  }

  public static data = new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input message')
    .addStringOption((option) =>
      option
        .setName('input')
        .setDescription('The input to echo back')
        .setRequired(true)
    )

  public async execute ({ interaction, channel }) {
    const input = interaction.options.getString('input')

    await interaction.deferReply()
    await interaction.deleteReply()

    return channel.send(input)
  }
}
