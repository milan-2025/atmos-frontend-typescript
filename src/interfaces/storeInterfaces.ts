export interface IinitialAuthValue {
  token: string | null
  expirationTime: number | null
  fullName: string | null
  teamID: string | null
}

export interface IhandleLoginPayload {
  token: string
  expirationTime: number
  name: string
  teamId: string
}
