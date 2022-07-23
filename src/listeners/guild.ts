import { bold } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

import Listener from '@structures/Listener'
import { ChannelAction } from '@utils/Enums'

export default class Guild extends Listener {
  constructor (client) {
    super(client, {
      unifiedEvents: true,
      events: [
        'guildBanAdd',
        'guildBanRemove',
        'guildMemberAdd',
        'guildMemberRemove'
      ]
    })
  }

  public onGuildBanAdd ({ guild, user }) {
    this.notifyChannels(
      {
        event: this.eventsByKey.guildBanAdd,
        action: ChannelAction.MEMBER_BAN,
        guild
      },
      (notifyChannel) =>
        notifyChannel
          .send({
            content: user.toString(),
            embeds: [
              new MessageEmbed()
                .setDescription(`${bold(user.tag)} was banned. (${user.id})`)
                .setFooter({
                  text: 'User Banned',
                  iconURL: user.displayAvatarURL({ size: 16 })
                })
                .setTimestamp()
            ]
          })
          .then(() =>
            this.logger.info({ labels: [this.eventsByKey.guildBanAdd] })
          )
    )
  }

  public onGuildBanRemove ({ guild, user }) {
    this.notifyChannels(
      {
        event: this.eventsByKey.guildBanRemove,
        action: ChannelAction.MEMBER_UNBAN,
        guild
      },
      (notifyChannel) =>
        notifyChannel
          .send({
            content: user.toString(),
            embeds: [
              new MessageEmbed()
                .setDescription(`${bold(user.tag)} was unbanned. (${user.id})`)
                .setFooter({
                  text: 'User Unbanned',
                  iconURL: user.displayAvatarURL({ size: 16 })
                })
                .setTimestamp()
            ]
          })
          .then(() =>
            this.logger.info({ labels: [this.eventsByKey.guildBanRemove] })
          )
    )
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
