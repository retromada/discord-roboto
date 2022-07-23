import { bold } from '@discordjs/builders'
import dayjs from 'dayjs'
import { MessageAttachment, MessageEmbed } from 'discord.js'

import Listener from '@structures/Listener'
import { ChannelAction } from '@utils/Enums'

export default class Message extends Listener {
  constructor (client) {
    super(client, {
      unifiedEvents: true,
      events: ['messageDelete', 'messageDeleteBulk', 'messageUpdate']
    })
  }

  public onMessageDelete ({
    attachments,
    author,
    channel,
    content,
    createdAt,
    embeds,
    guild
  }) {
    this.notifyChannels(
      {
        event: this.eventsByKey.messageDelete,
        action: ChannelAction.DELETE_MESSAGES,
        channel,
        guild
      },
      (notifyChannel) =>
        notifyChannel
          .send({
            embeds: [
              new MessageEmbed()
                .setAuthor({
                  name: author.tag,
                  iconURL: author.displayAvatarURL({ size: 16 })
                })
                .addFields(
                  { name: 'Channel', value: channel.toString() },
                  {
                    name: 'Content',
                    value: this.parseMessageContent({
                      attachments,
                      content,
                      embeds
                    })
                  }
                )
                .setFooter({ text: createdAt.toString() })
            ]
          })
          .then(() =>
            this.logger.info({ labels: [this.eventsByKey.messageDelete] })
          )
    )
  }

  public onMessageDeleteBulk (messages) {
    const { channel, guild } = messages.first()

    this.notifyChannels(
      {
        event: this.eventsByKey.messageDeleteBulk,
        action: ChannelAction.BULK_DELETE_MESSAGES,
        channel,
        guild
      },
      (notifyChannel) =>
        notifyChannel
          .send({
            files: [
              new MessageAttachment(
                Buffer.from(
                  messages
                    .map(
                      ({ author, content, createdAt }) =>
                        `[${dayjs(createdAt).format('YYYY/MM/DD HH:mm:ss')}] (${
                          author.id
                        }) ${author.tag} :: ${content}`
                    )
                    .reverse()
                    .join('\n')
                ),
                `deleted ${channel.name} ${dayjs().format(
                  'YYYY-MM-DD HH-mm-ss'
                )}.log`
              )
            ]
          })
          .then(() =>
            this.logger.info({ labels: [this.eventsByKey.messageDeleteBulk] })
          )
    )
  }

  public onMessageUpdate (
    {
      attachments: beforeAttachments,
      author,
      channel,
      content: beforeContent,
      createdAt,
      embeds: beforeEmbeds,
      guild
    },
    {
      attachments: afterAttachments,
      content: afterContent,
      embeds: afterEmbeds
    }
  ) {
    this.notifyChannels(
      {
        event: this.eventsByKey.messageUpdate,
        action: ChannelAction.UPDATE_MESSAGES,
        channel,
        guild
      },
      (notifyChannel) =>
        notifyChannel
          .send({
            embeds: [
              new MessageEmbed()
                .setAuthor({
                  name: author.tag,
                  iconURL: author.displayAvatarURL({ size: 16 })
                })
                .addFields(
                  { name: 'Channel', value: channel.toString() },
                  {
                    name: 'Before',
                    value: this.parseMessageContent({
                      attachments: beforeAttachments,
                      content: beforeContent,
                      embeds: beforeEmbeds
                    })
                  },
                  {
                    name: 'After',
                    value: this.parseMessageContent({
                      attachments: afterAttachments,
                      content: afterContent,
                      embeds: afterEmbeds
                    })
                  }
                )
                .setFooter({ text: createdAt.toString() })
            ]
          })
          .then(() =>
            this.logger.info({ labels: [this.eventsByKey.messageUpdate] })
          )
    )
  }

  private parseMessageContent ({ attachments, content, embeds }) {
    if (attachments.size) {
      return [
        content,
        ...attachments.mapValues(({ url }) => url).values()
      ].join('\n')
    } else if (embeds.length) {
      embeds.forEach((embed) =>
        Object.keys(embed).map(
          (key) =>
            (embed[key] === undefined ||
              embed[key] === null ||
              !embed[key].length) &&
            delete embed[key]
        )
      )

      return embeds
        .map((embed) =>
          Object.entries(embed)
            .map(
              ([key, value]) =>
                `${bold(key.capitalize())}: ${
                  Array.isArray(value)
                    ? `\n${value
                        .map(({ name, value }) => `${name}: ${value}`)
                        .join('\n')}`
                    : value
                }`
            )
            .join('\n')
        )
        .join('\n\n')
    } else {
      return content
    }
  }
}
