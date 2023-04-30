import { Cheats } from 'apis/UIDPolice'
import { MessageEmbed } from 'discord.js'

import { Command, Context, SlashCommandBuilder } from '@structures/command'
import { Endpoints } from '@utils/Constants'

export default class UID extends Command {
  constructor (client) {
    super({ name: 'uid', category: 'miscellaneous' }, client)
  }

  public static data = new SlashCommandBuilder()
    .setName('uid')
    .setDescription('Find user information in cheats')
    .addStringOption((option) =>
      option
        .setName('cheat')
        .setDescription('cheat')
        .setRequired(true)
        .addChoices(
          { name: 'Neverlose', value: Cheats.NEVERLOSE },
          { name: 'Primordial', value: Cheats.PRIMORDIAL },
          { name: 'Fatality', value: Cheats.FATALITY },
          { name: 'Monolith', value: Cheats.MONOLITH },
          { name: 'Pandora', value: Cheats.PANDORA },
          { name: 'Nemesis', value: Cheats.NEMESIS },
          { name: 'Rifk7', value: Cheats.RIFK7 },
          { name: 'Ev0lve', value: Cheats.EV0LVE }
        )
    )
    .addStringOption((option) =>
      option.setName('user').setDescription('UID or username').setRequired(true)
    )

  public async execute ({ interaction }: Context) {
    const cheat = interaction.options.getString('cheat')
    const user = interaction.options.getString('user')

    const data = await this.client.apis.uidPolice.find(cheat, user)

    if (data?.text) {
      throw new Error(data?.text?.capitalize())
    }

    const inviter = data?.inviter

    return await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setTitle(data?.username)
          .setThumbnail(data?.avatar)
          .addFields(
            { name: 'UID', value: data?.uid.toString(), inline: true },
            {
              name: 'Inviter',
              value: /no inviter/.test(inviter)
                ? inviter.capitalize()
                : inviter,
              inline: true
            },
            {
              name: 'Banned',
              value: data?.ban.capitalize(),
              inline: true
            }
          )
          .setFooter({
            text: `${cheat.capitalize()}${
              data?.joined.length ? ` · Member since ${data?.joined}` : ''
            }`,
            iconURL: Endpoints.Images('logotypes/cheats').File(cheat, 'jpg')
          })
      ]
    })
  }
}
