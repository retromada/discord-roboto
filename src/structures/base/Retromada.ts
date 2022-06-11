import { Client, Intents } from 'discord.js'

import loaders from '@loaders'

import Logger from './Logger'

export default class Retromada extends Client {
  public logger
  public commands: Map<string, any>

  constructor () {
    super({ intents: [Intents.FLAGS.GUILDS] })

    this.logger = new Logger({ prettyPrint: true })
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
