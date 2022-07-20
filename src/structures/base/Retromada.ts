import { Client, Intents } from 'discord.js'

import { IDefaultOptions } from '@interfaces'
import loaders from '@loaders'
import Options from '@utils/Options'

import Logger from './Logger'

export default class Retromada extends Client {
  public logger
  public commands: Map<string, any>
  public defaultOptions: IDefaultOptions

  constructor () {
    super({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES
      ]
    })

    this.logger = new Logger({ prettyPrint: true })
    this.commands = new Map()
    this.defaultOptions = Options.defaultOptions()

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
