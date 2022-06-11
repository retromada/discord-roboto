import type { Logger } from 'pino'

import { ICommandOptions } from '@interfaces'
import type Retromada from '@structures/base/Retromada'
import { optionHandler } from '@utils'

export default abstract class Command {
  public client: Retromada
  public logger: Logger
  public name: string
  public category: string
  public abstract execute(context): void

  constructor (options: ICommandOptions | any = {}, client) {
    this.client = client
    this.logger = client.logger

    options = optionHandler('Command', options)

    this.name = options.required('name')
    this.category = options.default('category', 'general')
  }

  public async executeCommand (context) {
    try {
      await this.execute(context)
    } catch (error) {
      this.error(context, error)
    }
  }

  private async error ({ interaction }, error) {
    if (error instanceof Error) {
      await interaction.reply(error.message)
    }

    this.logger.error({ labels: ['Command', 'execute'] }, error.message)
  }
}
