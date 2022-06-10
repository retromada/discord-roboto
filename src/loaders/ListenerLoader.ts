import Loader from '@structures/Loader'

export default class ListenerLoader extends Loader {
  constructor (client) {
    super(client)
  }

  public load () {
    return this.loadFiles(this.resolvePath('listeners'))
  }

  public loadFile (Listener, event: string) {
    const listener = new Listener(this.client)
    const prepareEvent = (event) =>
      this.client.on(event, (...v) => listener['on' + event.capitalize()](...v))

    if (listener.unifiedEvents) {
      listener.events.forEach(prepareEvent)
    } else {
      prepareEvent(event)
    }
  }
}
