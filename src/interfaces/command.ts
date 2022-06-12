export interface ICommandOptions {
  name: string
  category: string
}

export interface ICommandRequirementsOptions {
  developersOnly?: boolean
  managersOnly?: boolean
  errors: { [key: string]: string }
}
