import Loader from '@structures/Loader'

export default class CommandLoader extends Loader {
  constructor (client) {
    super(client)
  }

  public load () {
    return this.loadFiles(this.resolvePath('commands'))
  }

  public loadFile (Command) {
    const command = new Command(this.client)

    this.client.commands.set(command.name, command)
  }
}
