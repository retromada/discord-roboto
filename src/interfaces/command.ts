import type { CommandInteraction } from 'discord.js'

export interface ICommandContextOptions {
  interaction: CommandInteraction
}

export interface ICommandRequirementsOptions {
  developersOnly?: boolean
  managersOnly?: boolean
}

export interface ICommandRequirementsParsedOptions
  extends ICommandRequirementsOptions {
  errors: { [key: string]: string }
}

export interface ICommandOptions {
  name: string
  category: string
  requirements?: ICommandRequirementsOptions
}
