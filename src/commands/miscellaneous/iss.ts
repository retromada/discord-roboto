import { bold } from '@discordjs/builders'

import { Command, Context, SlashCommandBuilder } from '@structures/command'

export default class ISS extends Command {
  constructor (client) {
    super({ name: 'iss', category: 'miscellaneous' }, client)
  }

  public static data = new SlashCommandBuilder()
    .setName('iss')
    .setDescription('International Space Station current position')

  public async execute ({ interaction }: Context) {
    const { iss_position } = await this.client.apis.openNotify.iss()

    return await interaction.reply(
      `The ISS is currently over ${bold(iss_position.latitude + '° N')}, ${bold(
        iss_position.longitude + '° E'
      )}`
    )
  }
}
