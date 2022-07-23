import { REST } from '@discordjs/rest'
import { Command } from 'commander'
import { Routes } from 'discord-api-types/v10'

import File from '@utils/File'

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env
const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN)
const program = new Command()

program
  .option('-og, --only-guild')
  .option('-sc, --specific-commands <commands...>')
program.parse()

const options = program.opts()

const deployCommands = async (
  {
    onlyGuild = false,
    specificCommands
  }: { onlyGuild?: boolean; specificCommands?: string[] } = {},
  clientId = CLIENT_ID,
  guildId = GUILD_ID
) => {
  let commands = []

  await File.requireDirectory(
    'src/commands',
    (Command) => commands.push(Command.data.toJSON()),
    console.error
  )

  if (specificCommands?.length) {
    commands = commands.filter(({ name }) => specificCommands.includes(name))
  }

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

deployCommands(options)
