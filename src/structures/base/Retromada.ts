import { Client, Intents } from 'discord.js'

import { IDefaultOptions } from '@interfaces'
import loaders from '@loaders'
import Options from '@utils/Options'

import Logger from './Logger'

export default class Retromada extends Client {
  public logger
  public defaultOptions: IDefaultOptions
  public commands: Map<string, any>
  public apis: { [key: string]: any }

  constructor () {
    super({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_MESSAGES
      ]
    })

    this.logger = new Logger({ prettyPrint: true })
    this.defaultOptions = Options.defaultOptions()
    this.commands = new Map()

    this.initializeLoaders()
  }

  private async initializeLoaders () {
    for (const name in loaders) {
      const loader = new loaders[name](this)

      try {
        await loader.load()
      } catch (error) {
        this.logger.error(
          { labels: ['initializeLoaders'], loader: name },
          error.message
        )
      }
    }
  }
}
