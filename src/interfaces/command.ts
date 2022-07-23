import type { CommandInteraction } from 'discord.js'

export interface ICommandOptions {
  name: string
  category: string
}

export interface ICommandContextOptions {
  interaction: CommandInteraction
}

export interface ICommandRequirementsOptions {
  developersOnly?: boolean
  managersOnly?: boolean
  errors: { [key: string]: string }
}
