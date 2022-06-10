import Command from '@structures/command/Command'

export default class Ping extends Command {
  constructor (client) {
    super({ name: 'ping', category: 'bot' }, client)
  }

  public execute () {
    return `${~~this.client.ws.ping}ms`
  }
}
