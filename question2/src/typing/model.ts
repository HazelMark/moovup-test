
export type Friend = {
    _id: string,
    email?: string,
    name?: {last?: string, first?: string},
    location?: {latitude?: number, longitude?: number},
    picture?: string,
  }
  