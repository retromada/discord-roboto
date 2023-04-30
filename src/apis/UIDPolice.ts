import fetch from 'cross-fetch'

import APIWrapper from '@structures/APIWrapper'

const API_URL = 'https://uidpolice.xyz/api'

export enum Cheats {
  NEVERLOSE = 'neverlose',
  PRIMORDIAL = 'primordial',
  FATALITY = 'fatality',
  MONOLITH = 'monolith',
  PANDORA = 'pandora',
  NEMESIS = 'nemesis',
  RIFK7 = 'rifk7',
  EV0LVE = 'ev0lve'
}

export default class UIDPolice extends APIWrapper {
  constructor () {
    super({ name: 'uidPolice' })
  }

  public find (cheat: Cheats, user: string) {
    return this.request(`${cheat}/${user}`)
  }

  private request (endpoint: string) {
    return fetch(`${API_URL}/${endpoint}`).then((response) =>
      response.json()
    )
  }
}
