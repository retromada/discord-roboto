import { MessageAttachment, MessageEmbed } from 'discord.js'

import Listener from '@structures/Listener'

export default class Message extends Listener {
  constructor (client) {
    super(client, {
      unifiedEvents: true,
      events: ['messageDelete', 'messageDeleteBulk', 'messageUpdate']
    })
  }

  public async onMessageDelete (message) {
    this.options.notifyChannels.forEach(({ channelId, actions }) => {
      if (message.channel.id !== channelId && actions.deleteMessages) {
        message.guild.channels
          .fetch(channelId)
          .then((channel) =>
            channel.send({
              embeds: [
                new MessageEmbed()
                  .setAuthor({
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ size: 16 })
                  })
                  .addFields(
                    { name: 'Channel', value: `<#${message.channel.id}>` },
                    { name: 'Content', value: message.content }
                  )
                  .setFooter({ text: message.createdAt.toString() })
              ]
            })
          )
          .catch(console.error)
      }
    })
  }

  public async onMessageDeleteBulk (messages) {
    const { channel, guild } = messages.first()

    this.options.notifyChannels.forEach(({ channelId, actions }) => {
      if (channel.id !== channelId && actions.bulkDeleteMessages) {
        guild.channels
          .fetch(channelId)
          .then((channel) =>
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
          .catch(console.error)
      }
    })
  }

  public async onMessageUpdate (message, { content }) {
    this.options.notifyChannels.forEach(({ channelId, actions }) => {
      if (message.channel.id !== channelId && actions.updateMessages) {
        message.guild.channels
          .fetch(channelId)
          .then((channel) =>
            channel.send({
              embeds: [
                new MessageEmbed()
                  .setAuthor({
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ size: 16 })
                  })
                  .addFields(
                    { name: 'Channel', value: `<#${message.channel.id}>` },
                    { name: 'Before', value: message.content },
                    { name: 'After', value: content }
                  )
                  .setFooter({ text: message.createdAt.toString() })
              ]
            })
          )
          .catch(console.error)
      }
    })
  }
}
