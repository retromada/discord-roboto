import express, { Express } from 'express'
import PinoHTTPLogger from 'pino-http'

import Loader from '@structures/Loader'

export default abstract class HTTPLoader extends Loader {
  public http: Express

  constructor (client) {
    super(client)
  }

  load () {
    this.initializeHTTPServer()

    return this.loadFiles(this.resolvePath('http'))
  }

  loadFile (Route, name) {
    const route = new Route({ name }, this.client)

    route.register(this.http)
  }

  initializeHTTPServer (port = process.env.PORT) {
    if (!port) {
      return this.logger.warn(
        { labels: ['HTTPLoader', 'initializeHTTPServer'] },
        'Server not started - Environment variable "PORT" is not set'
      )
    }

    this.http = express()

    this.http.use(express.json())
    this.http.use(PinoHTTPLogger({ logger: this.logger }))

    this.http.listen(port, () =>
      this.logger.info({ labels: ['HTTPLoader'] }, `Listening on port ${port}`)
    )
  }
}