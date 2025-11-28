export interface ICreateCompany {
  companyName: string
  location: string
  adminEmail: string
  fullName: string
  password: string
}

export interface IRegisterCompanySuccessResponse {
  success: boolean
  message: string
  token: string
  name: string
  teamId: string
  email: string
}

export interface ICreateTeamSussesResponse {
  success: boolean
  message: string
}

export interface ILoginSuccessResponse {
  success: boolean
  token: string
  flow: string
  name: string
  teamId: string
  email: string
}

export interface IAddMemberData {
  fullName: string
  email: string
  teamId: string
  teamName: string
}

export interface IAddMemberSuccess {
  success: boolean
  message: string
}

export interface ISetPasswordData {
  specialToken: string
  password: string
}

export interface ISetPasswordResponse {
  success: boolean
  message: string
  token: string
  name: string
}

export interface ISuccessResponse {
  success: boolean
  message: string
}

export interface IPulseCheckData {
  pulseResponse: string
}

export interface IWorkloadResponse {
  _id: string
  createdAt: string
  pulseResponse: string
}
export interface IPulseChartSuccessResponse {
  success: boolean
  workloads: IWorkloadResponse[]
}
