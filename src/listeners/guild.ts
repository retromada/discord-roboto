import { bold } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

import Listener from '@structures/Listener'
import { ChannelAction } from '@utils/Enums'

export default class Guild extends Listener {
  constructor (client) {
    super(client, {
      unifiedEvents: true,
      events: ['guildMemberAdd', 'guildMemberRemove']
    })
  }

  public onGuildMemberAdd ({ guild, user }) {
    this.notifyChannels(
      {
        event: this.eventsByKey.guildMemberAdd,
        action: ChannelAction.MEMBER_JOIN,
        guild
      },
      (notifyChannel) =>
        notifyChannel
          .send({
            content: user.toString(),
            embeds: [
              new MessageEmbed()
                .setDescription(
                  `${bold(user.tag)} joined the server. (${user.id})`
                )
                .setFooter({
                  text: `User Join (${guild.memberCount})`,
                  iconURL: user.displayAvatarURL({ size: 16 })
                })
                .setTimestamp()
            ]
          })
          .then(() =>
            this.logger.info({ labels: [this.eventsByKey.guildMemberAdd] })
          )
    )
  }

  public onGuildMemberRemove ({ guild, user }) {
    this.notifyChannels(
      {
        event: this.eventsByKey.guildMemberRemove,
        action: ChannelAction.MEMBER_LEAVE,
        guild
      },
      (notifyChannel) =>
        notifyChannel
          .send({
            content: user.toString(),
            embeds: [
              new MessageEmbed()
                .setDescription(
                  `${bold(user.tag)} left the server. (${user.id})`
                )
                .setFooter({
                  text: `User Leave (${guild.memberCount})`,
                  iconURL: user.displayAvatarURL({ size: 16 })
                })
                .setTimestamp()
            ]
          })
          .then(() =>
            this.logger.info({ labels: [this.eventsByKey.guildMemberRemove] })
          )
    )
  }
}
