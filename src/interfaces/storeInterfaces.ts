export interface IinitialAuthValue {
  token: string | null
  expirationTime: number | null
  fullName: string | null
  teamID: string | null
  email: string | null
  role: string[] | null
}

export interface IhandleLoginPayload {
  token: string
  expirationTime: number
  name: string
  teamId: string
  email: string
  role: string[]
}

export interface IQuestion {
  question: string
  upvotes: number
  createdAt?: string
}

export interface IMember {
  email: string
  userId?: string
  fullname: string
}

export interface IinitialQaMeetingValue {
  members: IMember[]
  questions: IQuestion[]
}
