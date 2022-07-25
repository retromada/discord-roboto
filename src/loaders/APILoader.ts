import Loader from '@structures/Loader'

export default class APILoader extends Loader {
  public apis: { [key: string ]: any }

  constructor (client) {
    super(client)

    this.apis = {}
  }

  public async load () {
    try {
      await this.loadFiles(this.resolvePath('apis'))
      this.client.apis = this.apis
    } catch (error) {
      this.logger.error({ labels: ['APILoader'] }, error.message)
    }
  }

  public async loadFile (API) {
    const api = new API()

    this.apis[api.name] = await api.load()
  }
}
