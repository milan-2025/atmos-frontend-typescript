import { QueryClient } from "@tanstack/react-query"
import type {
  IAddMemberData,
  IAddMemberSuccess,
  ICreateCompany,
  ICreateTeamSussesResponse,
  ILoginSuccessResponse,
  IRegisterCompanySuccessResponse,
  ISetPasswordData,
  ISetPasswordResponse,
} from "./apiHandlerInterfaces"
import type {
  ICreateTeam,
  IGetTeamsParams,
  IgetTeamSuccessResponse,
  IloginFormProps,
} from "@/components/my-components/componentsinerfaces"
import { getTokenFromLocalStorage } from "@/helpers/authentication"

const baseURL = "http://localhost:3000"

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
