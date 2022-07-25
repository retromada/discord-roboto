import fetch from 'cross-fetch'

import APIWrapper from '@structures/APIWrapper'

const API_URL = 'http://api.open-notify.org'

export default class OpenNotify extends APIWrapper {
  constructor () {
    super({ name: 'openNotify' })
  }

  public iss () {
    return this.request('iss-now')
  }

  public astros () {
    return this.request('astros')
  }

  private request (endpoint: string) {
    return fetch(`${API_URL}/${endpoint}.json`).then((response) =>
      response.json()
    )
  }
}
