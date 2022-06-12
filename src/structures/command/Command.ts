import type { Logger } from 'pino'

import { ICommandOptions, ICommandRequirementsOptions } from '@interfaces'
import type Retromada from '@structures/base/Retromada'
import { optionHandler } from '@utils'

import Requirements from './Requirements'

export default abstract class Command {
  public client: Retromada
  public logger: Logger
  public name: string
  public category: string
  public requirements: ICommandRequirementsOptions
  public abstract execute(context): void

  constructor (options: ICommandOptions | any = {}, client) {
    this.client = client
    this.logger = client.logger

    options = optionHandler('Command', options)

    this.name = options.required('name')
    this.category = options.default('category', 'general')
    this.requirements = options.optional('requirements')
  }

  public async executeCommand (context) {
    try {
      await this.handleRequirements(context)
      await this.execute(context)
    } catch (error) {
      this.error(context, error)
    }
  }

  private handleRequirements (context) {
    return this.requirements
      ? Requirements.handle(context, this.requirements)
      : true
  }

  private async error ({ interaction }, error) {
    if (error instanceof Error) {
      await interaction.reply({ content: error.message, ephemeral: true })
    }

    this.logger.error({ labels: ['Command', 'execute'] }, error.message)
  }
}
