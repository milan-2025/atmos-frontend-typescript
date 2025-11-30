import { QueryClient } from "@tanstack/react-query"
import type {
  IAddMemberData,
  IAddMemberSuccess,
  ICreateCompany,
  ICreateTeamSussesResponse,
  ILoginSuccessResponse,
  IPulseChartSuccessResponse,
  IPulseCheckData,
  IRegisterCompanySuccessResponse,
  ISetPasswordData,
  ISetPasswordResponse,
  ISuccessResponse,
} from "../interfaces/apiHandlerInterfaces"
import type {
  ICreateTeam,
  IGetTeamsParams,
  IgetTeamSuccessResponse,
  IloginFormProps,
} from "@/interfaces/componentsinerfaces"
import { getTokenFromLocalStorage } from "@/helpers/authentication"
import links from "@/helpers/links"
import type { IQuestion } from "@/interfaces/storeInterfaces"

const baseURL = links.backendbaseUrlRemote

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

export const registerCompanyHandler = async (
  createCompanyData: ICreateCompany
) => {
  const response = await fetch(
    `${baseURL}/api/authentication/register-company`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createCompanyData),
    }
  )

  if (!response.ok) {
    let error: Error | any = new Error("Error while registring company.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: IRegisterCompanySuccessResponse = await response.json()
  return data
}

export const createTeamHandler = async (createTeamData: ICreateTeam) => {
  const token = getTokenFromLocalStorage()
  if (!token) {
    let error: Error | any = new Error(
      "Error while creating team. No token found."
    )
    // error.code = response.status
    // error.info = await response.json()
    throw error
  }
  const response = await fetch(`${baseURL}/api/admin/create-team`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(createTeamData),
  })

  if (!response.ok) {
    let error: Error | any = new Error("Error while creating team")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: ICreateTeamSussesResponse = await response.json()
  return data
}

export const loginHandler = async (loginData: IloginFormProps) => {
  const response = await fetch(`${baseURL}/api/authentication/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })

  if (!response.ok) {
    let error: Error | any = new Error("Error while logging in.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: ILoginSuccessResponse = await response.json()
  return data
}

export const getTeamsHandler = async ({
  signal,
  queryKey,
}: {
  signal?: AbortSignal
  queryKey: (string | IGetTeamsParams | null)[]
}) => {
  //get token
  let token = queryKey[2]
  if (!token) {
    let error: Error | any = new Error(
      "Error while creating team. No token found."
    )
    // error.code = response.status
    // error.info = await response.json()
    throw error
  }

  const qParams = queryKey[1] as IGetTeamsParams

  //configure url
  let url = new URL(`${baseURL}/api/admin/get-teams`)
  if (qParams) {
    if (qParams.page) {
      url.searchParams.append("page", String(qParams.page))
    }
    if (qParams.limit) {
      url.searchParams.append("limit", String(qParams.limit))
    }
  }

  // send response
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  })

  if (!response.ok) {
    let error: Error | any = new Error("Error while getting teams data.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: IgetTeamSuccessResponse = await response.json()

  return data
}

export const addMemberHandler = async (addMemberData: IAddMemberData) => {
  const token = getTokenFromLocalStorage()
  if (!token) {
    let error: Error | any = new Error(
      "Error while Adding Member No token found."
    )
    // error.code = response.status
    // error.info = await response.json()
    throw error
  }
  const response = await fetch(`${baseURL}/api/admin/add-member`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(addMemberData),
  })

  if (!response.ok) {
    let error: Error | any = new Error("Error while adding member")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: IAddMemberSuccess = await response.json()
  return data
}

export const setPasswordHandler = async (setPasswordata: ISetPasswordData) => {
  if (!localStorage.getItem("specialToken")) {
    let error: Error | any = new Error("No special token found")
    throw error
  }
  let specailToken = localStorage.getItem("specialToken") as string

  setPasswordata.specialToken = specailToken

  const response = await fetch(`${baseURL}/api/authentication/setup-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${specailToken}`,
    },
    body: JSON.stringify(setPasswordata),
  })

  if (!response.ok) {
    let error: Error | any = new Error("Error while adding member")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: ISetPasswordResponse = await response.json()
  return data
}

export const checkcanAddPulse = async ({
  signal,
  queryKey,
}: {
  signal?: AbortSignal
  queryKey: (string | null)[]
}) => {
  //get token
  let token = queryKey[1]
  if (!token) {
    let error: Error | any = new Error(
      "Error while creating team. No token found."
    )
    // error.code = response.status
    // error.info = await response.json()
    throw error
  }

  // send response
  const response = await fetch(baseURL + "/api/pulsecheck/can-add-pulse", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  })

  if (!response.ok) {
    let error: Error | any = new Error("Error can't add to pulse")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: ISuccessResponse = await response.json()

  return data
}

export const submitPulseCheckHandler = async (
  submitPulseCheckData: IPulseCheckData
) => {
  const token = getTokenFromLocalStorage()
  if (!token) {
    let error: Error | any = new Error(
      "Error while Pulse Check No token found."
    )
    // error.code = response.status
    // error.info = await response.json()
    throw error
  }
  const response = await fetch(`${baseURL}/api/pulsecheck/add-pulse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(submitPulseCheckData),
  })

  if (!response.ok) {
    let error: Error | any = new Error("Error while pulse check")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: ISuccessResponse = await response.json()
  return data
}

export const getPulseChartData = async ({
  signal,
  queryKey,
}: {
  signal?: AbortSignal
  queryKey: (string | null)[]
}) => {
  //get token
  let token = queryKey[2]
  if (!token) {
    let error: Error | any = new Error(
      "Error while getting pulse chart. No token found."
    )
    // error.code = response.status
    // error.info = await response.json()
    throw error
  }

  // send response
  const response = await fetch(baseURL + "/api/pulsecheck/get-chart-data", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  })

  if (!response.ok) {
    let error: Error | any = new Error("Error can't get pulse chart data")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: IPulseChartSuccessResponse = await response.json()

  return data
}

export const startMeetingHandler = async () => {
  const token = getTokenFromLocalStorage()
  if (!token) {
    let error: Error | any = new Error(
      "Error while Pulse Check No token found."
    )
    // error.code = response.status
    // error.info = await response.json()
    throw error
  }
  const response = await fetch(`${baseURL}/api/manager/start-live-qa`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    let error: Error | any = new Error("Error while starting live qa")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: ISuccessResponse = await response.json()
  return data
}

export const getLiveQaDataHandler = async ({
  signal,
  queryKey,
}: {
  signal?: AbortSignal
  queryKey: (string | null)[]
}) => {
  //get token
  let token = queryKey[1]
  if (!token) {
    let error: Error | any = new Error(
      "Error while creating team. No token found."
    )
    // error.code = response.status
    // error.info = await response.json()
    throw error
  }

  // send response
  const response = await fetch(baseURL + "/api/meeting/get-live-qa-data", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  })

  if (!response.ok) {
    let error: Error | any = new Error("Error can't get live data ")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: any = await response.json()

  return data
}

export const AskQuestionHandler = async (questionData: IQuestion) => {
  const token = getTokenFromLocalStorage()
  if (!token) {
    let error: Error | any = new Error(
      "Error while Pulse Check No token found."
    )
    // error.code = response.status
    // error.info = await response.json()
    throw error
  }

  const response = await fetch(`${baseURL}/api/meeting/ask-question`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(questionData),
  })

  if (!response.ok) {
    let error: Error | any = new Error("Error while asking question")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: ISuccessResponse = await response.json()
  return data
}

export const getLiveQaStatus = async ({
  signal,
  queryKey,
}: {
  signal?: AbortSignal
  queryKey: (string | null)[]
}) => {
  //get token
  let token = queryKey[1]
  if (!token) {
    let error: Error | any = new Error(
      "Error while creating team. No token found."
    )
    // error.code = response.status
    // error.info = await response.json()
    throw error
  }

  // send response
  const response = await fetch(baseURL + "/api/meeting/is-meeting-active", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  })

  if (!response.ok) {
    let error: Error | any = new Error("Error can't get live data ")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: any = await response.json()

  return data
}

export const AssignManagerHandler = async (assignManagerData: any) => {
  const token = getTokenFromLocalStorage()
  if (!token) {
    let error: Error | any = new Error(
      "Error while Pulse Check No token found."
    )
    // error.code = response.status
    // error.info = await response.json()
    throw error
  }

  const response = await fetch(`${baseURL}/api/admin/assign-manager`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(assignManagerData),
  })

  if (!response.ok) {
    let error: Error | any = new Error("Error while assigning manager")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: any = await response.json()
  return data
}

export const userLeftMeetingHandler = async () => {
  const token = getTokenFromLocalStorage()
  if (!token) {
    let error: Error | any = new Error(
      "Error while Pulse Check No token found."
    )
    // error.code = response.status
    // error.info = await response.json()
    throw error
  }

  const response = await fetch(`${baseURL}/api/meeting/user-left-meeting`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    let error: Error | any = new Error("Error while assigning manager")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: any = await response.json()
  return data
}

export const endLiveQaHandler = async () => {
  const token = getTokenFromLocalStorage()
  if (!token) {
    let error: Error | any = new Error(
      "Error while Pulse Check No token found."
    )
    // error.code = response.status
    // error.info = await response.json()
    throw error
  }

  const response = await fetch(`${baseURL}/api/manager/end-live-qa`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    let error: Error | any = new Error("Error while assigning manager")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: any = await response.json()
  return data
}
