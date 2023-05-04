import { bold } from '@discordjs/builders'

import { Command, Context, SlashCommandBuilder } from '@structures/command'
import { delay } from '@utils'

export default class Prune extends Command {
  constructor (client) {
    super({ name: 'prune', category: 'moderation' }, client)
  }

  public static data = new SlashCommandBuilder()
    .setName('prune')
    .setDescription('Deletes existing messages on the channel')
    .addIntegerOption((option) =>
      option
        .setName('amount')
        .setDescription('Number of messages to be deleted')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    )

  public async execute ({ interaction, channel }: Context) {
    const amount = interaction.options.getInteger('amount')
    const messages = await channel.bulkDelete(amount)

    await interaction.reply(
      `Deleted ${bold(messages.size.toString())} message${
        messages.size !== 1 ? 's' : ''
      }`
    )

    await delay(2555)

    return await interaction.deleteReply()
  }
}
