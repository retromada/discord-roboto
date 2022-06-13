import { Request, Response, Router } from 'express'

import Route from '@structures/Route'

export default class Ok extends Route {
  register (http) {
    const router = Router()

    router.get('/', (request: Request, response: Response) =>
      response.status(200).json({ ok: true })
    )

    http.use(this.path, router)
  }
}
