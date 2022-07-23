import type { GuildMember } from 'discord.js'

import {
  ICommandRequirementsOptions,
  ICommandRequirementsParsedOptions
} from '@interfaces'

const { DEVELOPER_ROLE_ID, MANAGER_ROLE_ID } = process.env

export default class Requirements {
  public static parseOptions (
    options: ICommandRequirementsOptions
  ): ICommandRequirementsParsedOptions {
    return {
      developersOnly: !!options.developersOnly,
      managersOnly: !!options.managersOnly,

      errors: {
        developersOnly: 'Only the bot developers can do that.',
        managersOnly: 'Only the bot managers can do that.'
      }
    }
  }

  public static async handle (
    { member }: { member: GuildMember },
    requirementsOptions: ICommandRequirementsOptions
  ) {
    const options = this.parseOptions(requirementsOptions)

    if (options.developersOnly) {
      const isDeveloper = this.memberHasSpecificRole(member, DEVELOPER_ROLE_ID)

      if (!isDeveloper) {
        throw new Error(options.errors.developersOnly)
      }
    }

    if (options.managersOnly) {
      const isManager = this.memberHasSpecificRole(member, MANAGER_ROLE_ID)

      if (!isManager) {
        throw new Error(options.errors.managersOnly)
      }
    }
  }

  private static memberHasSpecificRole (member: GuildMember, role: string) {
    return member.roles.cache.has(role)
  }
}
