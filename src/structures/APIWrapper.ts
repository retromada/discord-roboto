import { IAPIWrapperOptions, IOptionHandler } from '@interfaces'
import { optionHandler } from '@utils'

export default class APIWrapper {
  private apiOptions: IOptionHandler
  public name: string

  constructor (options: IAPIWrapperOptions) {
    this.apiOptions = optionHandler('APIWrapper', options)

    this.name = this.apiOptions.required('name')
  }

  public load () {
    return this
  }
}
