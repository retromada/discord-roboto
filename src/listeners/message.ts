import { MessageEmbed } from 'discord.js'

import Listener from '@structures/Listener'

export default class Message extends Listener {
  constructor (client) {
    super(client, { unifiedEvents: true, events: ['messageDelete'] })
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
}
