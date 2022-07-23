import type { Logger } from 'pino'

import {
  ICommandOptions,
  ICommandRequirementsOptions,
  IOptionHandler
} from '@interfaces'
import type Retromada from '@structures/base/Retromada'
import { optionHandler } from '@utils'

import type Context from './Context'
import Requirements from './Requirements'

export default abstract class Command {
  private commandOptions: IOptionHandler
  public name: string
  public category: string
  public requirements: ICommandRequirementsOptions
  public client: Retromada
  public logger: Logger
  public abstract execute(context: Context): void

  constructor (options: ICommandOptions, client: Retromada) {
    this.commandOptions = optionHandler('Command', options)

    this.name = this.commandOptions.required('name')
    this.category = this.commandOptions.default('category', 'general')
    this.requirements = this.commandOptions.optional('requirements')

    this.client = client
    this.logger = client.logger
  }

  public async executeCommand (context: Context) {
    try {
      await this.handleRequirements(context)
      await this.execute(context)
    } catch (error) {
      this.error(context, error)
    }
  }

  private handleRequirements (context: Context) {
    return this.requirements
      ? Requirements.handle(context, this.requirements)
      : true
  }

  private async error ({ interaction }: Context, error) {
    if (error instanceof Error) {
      await interaction.reply({ content: error.message, ephemeral: true })
    }

    this.logger.error({ labels: ['Command', 'execute'] }, error.message)
  }
}
