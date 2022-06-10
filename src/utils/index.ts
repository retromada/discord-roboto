import { IListenerOptions } from '@interfaces'

export const optionHandler = (
  structure: string,
  options?: IListenerOptions
) => ({
  default (name: string, defaultValue: any | any[]) {
    const value = options[name]

    return typeof value === 'undefined'
      ? Array.isArray(defaultValue)
        ? defaultValue.random()
        : defaultValue
      : value
  },
  optional (name: string): any | null {
    return options[name] || null
  },
  required (name: string) {
    const value = options[name]

    if (typeof value === 'undefined') {
      throw new Error(
        `The "${name}" option in the ${structure} structure is required`
      )
    }

    return value
  }
})
