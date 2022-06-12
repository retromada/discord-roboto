import { ICommandRequirementsOptions } from '@interfaces'

const { DEVELOPER_ROLE_ID, MANAGER_ROLE_ID } = process.env

export default class Requirements {
  public static parseOptions (options: ICommandRequirementsOptions) {
    return {
      developersOnly: !!options.developersOnly,
      managersOnly: !!options.managersOnly,

      errors: {
        developersOnly: 'Only the bot developers can do that.',
        managersOnyl: 'Only the bot managers can do that.'
      }
    }
  }

  public static async handle ({ member }, options) {
    options = this.parseOptions(options)

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

  private static memberHasSpecificRole (member, role) {
    return member.roles.cache.has(role)
  }
}
