import { REST } from '@discordjs/rest'
import { program } from 'commander'
import { Routes } from 'discord-api-types/v9'

import File from '@utils/File'

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env
const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN)

program.option('-og, --only-guild')
program.parse()

const options = program.opts()

const deployCommands = async (
  onlyGuild = false,
  clientId = CLIENT_ID,
  guildId = GUILD_ID
) => {
  const commands = []

  await File.requireDirectory(
    'src/commands',
    (Command) => commands.push(Command.data.toJSON()),
    console.error
  )

  try {
    await rest.put(
      onlyGuild
        ? Routes.applicationGuildCommands(clientId, guildId)
        : Routes.applicationCommands(clientId),
      {
        body: commands
      }
    )
  } catch (error) {
    console.error(error)
  }
}

deployCommands(options.onlyGuild)
