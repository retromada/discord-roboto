import type { GuildMember } from 'discord.js'

import {
  ICommandRequirementsOptions,
  ICommandRequirementsParsedOptions
} from '@interfaces'
import { Errors } from '@utils/Constants'

const { DEVELOPER_MASTER_ID, DEVELOPER_ROLE_ID, MANAGER_ROLE_ID } = process.env

export default class Requirements {
  public static parseOptions (
    options: ICommandRequirementsOptions
  ): ICommandRequirementsParsedOptions {
    return {
      developersOnly: !!options.developersOnly,
      managersOnly: !!options.managersOnly,

      errors: {
        developersOnly: Errors.Command.Requirements.DEVELOPERS_ONLY,
        managersOnly: Errors.Command.Requirements.MANAGERS_ONLY
      }
    }
  }

  public static async handle (
    { member }: { member: GuildMember },
    requirementsOptions: ICommandRequirementsOptions
  ) {
    const options = this.parseOptions(requirementsOptions)
    const isDeveloperMaster = member.id === DEVELOPER_MASTER_ID

    if (options.developersOnly) {
      const isDeveloper = this.memberHasSpecificRole(member, DEVELOPER_ROLE_ID)

      if (!isDeveloper && !isDeveloperMaster) {
        throw new Error(options.errors.developersOnly)
      }
    }

    if (options.managersOnly) {
      const isManager = this.memberHasSpecificRole(member, MANAGER_ROLE_ID)

      if (!isManager && !isDeveloperMaster) {
        throw new Error(options.errors.managersOnly)
      }
    }
  }

  private static memberHasSpecificRole (member: GuildMember, role: string) {
    return member.roles.cache.has(role)
  }
}
