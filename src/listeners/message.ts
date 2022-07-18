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

  public onMessageDelete ({ author, channel, content, createdAt, guild }) {
    this.notifyChannels(
      {
        event: 'messageDelete',
        action: ChannelAction.DELETE_MESSAGES,
        channel,
        guild
      },
      (channel) =>
        channel.send({
          embeds: [
            new MessageEmbed()
              .setAuthor({
                name: author.tag,
                iconURL: author.displayAvatarURL({ size: 16 })
              })
              .addFields(
                { name: 'Channel', value: channel.toString() },
                { name: 'Content', value: content }
              )
              .setFooter({ text: createdAt.toString() })
          ]
        })
    )
  }

  public onMessageDeleteBulk (messages) {
    const { channel, guild } = messages.first()

    this.notifyChannels(
      {
        event: 'messageDeleteBulk',
        action: ChannelAction.BULK_DELETE_MESSAGES,
        channel,
        guild
      },
      (channel) =>
        channel.send({
          files: [
            new MessageAttachment(
              Buffer.from(
                messages
                  .map(
                    ({ author, content }) =>
                      `(${author.id}) ${author.tag} :: ${content}`
                  )
                  .reverse()
                  .join('\n')
              ),
              `deleted ${channel.name} ${new Date()}.log`
            )
          ]
        })
    )
  }

  public onMessageUpdate (
    { author, channel, content: beforeContent, createdAt, guild },
    { content: afterContent }
  ) {
    this.notifyChannels(
      {
        event: 'messageUpdate',
        action: ChannelAction.UPDATE_MESSAGES,
        channel,
        guild
      },
      (channel) =>
        channel.send({
          embeds: [
            new MessageEmbed()
              .setAuthor({
                name: author.tag,
                iconURL: author.displayAvatarURL({ size: 16 })
              })
              .addFields(
                { name: 'Channel', value: channel.toString() },
                { name: 'Before', value: beforeContent },
                { name: 'After', value: afterContent }
              )
              .setFooter({ text: createdAt.toString() })
          ]
        })
    )
  }
}
