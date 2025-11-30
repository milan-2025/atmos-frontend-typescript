import links from "./links"

export const handleLocalStorageLogin = (
  token: string,
  expirtionTime: number,
  name: string,
  teamId: string,
  email: string,
  role: string[]
) => {
  localStorage.setItem("token", token)
  localStorage.setItem("expirationTime", expirtionTime.toString())
  localStorage.setItem("name", name)
  localStorage.setItem("teamId", teamId)
  localStorage.setItem("email", email)
  localStorage.setItem("role", JSON.stringify(role))
}

export const getTokenFromLocalStorage = () => {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token") as string
  }
  return null
}

export const getExpirationTimeFromLocalStorage = () => {
  if (localStorage.getItem("expirationTime")) {
    return parseInt(localStorage.getItem("expirationTime") as string)
  }
  return null
}

export const isTokenExpired = () => {
  const expirationTime = getExpirationTimeFromLocalStorage()
  if (expirationTime) {
    return expirationTime < new Date().getTime()
  }
  return false
}

export const getRemainingExpirationTime = () => {
  const currentTime = new Date().getTime()
  const expirationTime = getExpirationTimeFromLocalStorage()
  if (expirationTime) {
    const remaningTime = expirationTime - currentTime
    if (remaningTime <= 0) {
      return 0
    }
    return remaningTime
  }
  return 0
}

export const handleLocalStorageLogout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("expirationTime")
  localStorage.removeItem("name")
  localStorage.removeItem("teamId")
  localStorage.removeItem("email")
  localStorage.removeItem("role")
}

let baseUrl = links.backendbaseUrlRemote

export const isLoggedIn = async () => {
  const token = getTokenFromLocalStorage()
  if (!token) {
    // If no token exists, immediately redirect to login
    // throw redirect("/login");
    return false
  }

  if (isTokenExpired()) {
    return false
  }

  try {
    const response = await fetch(`${baseUrl}/api/authentication/check-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      return false
    }
    return true
  } catch (e) {
    console.log("error while validating token---", e)
    return false
  }
}

export const isAdmin = async () => {
  const token = getTokenFromLocalStorage()
  console.log("token", token)
  if (!token) {
    // If no token exists, immediately redirect to login
    // throw redirect("/login");
    return false
  }

  if (isTokenExpired()) {
    return false
  }
  try {
    const response = await fetch(`${baseUrl}/api/authentication/check-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      return false
    }
    return true
  } catch (e) {
    console.log("error while validating token---", e)
    return false
  }
}

export const checkSpecialToken = async () => {
  if (!localStorage.getItem("specialToken")) {
    return false
  }
  try {
    const specailToken = localStorage.getItem("specialToken")
    const response = await fetch(
      `${baseUrl}/api/authentication/check-special-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${specailToken}`,
        },
      }
    )
    if (!response.ok) {
      return false
    }
    return true
  } catch (e) {
    console.log("error while validating token---", e)
    return false
  }
}

export const isAllowedInMeeting = async () => {
  const token = getTokenFromLocalStorage()
  const teamId = localStorage.getItem("teamId")

  if (!token) {
    // If no token exists, immediately redirect to login
    // throw redirect("/login");
    return false
  }

  if (isTokenExpired()) {
    return false
  }

  if (!teamId) {
    return false
  }

  try {
    const response = await fetch(
      `${baseUrl}/api/authentication/check-qa-meeting`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ms: teamId,
        }),
      }
    )
    if (!response.ok) {
      return false
    }
    return true
  } catch (e) {
    console.log("error while validating token---", e)
    return false
  }
}
