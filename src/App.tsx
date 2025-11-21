import { createBrowserRouter, redirect, RouterProvider } from "react-router"
import "./App.css"
import RootLayout from "./pages/RootLayout"
import CompanyRegistration from "./pages/CompanyRegistration"
import { useEffect } from "react"
import {
  checkSpecialToken,
  getExpirationTimeFromLocalStorage,
  getRemainingExpirationTime,
  getTokenFromLocalStorage,
  isAdmin,
  isLoggedIn,
  isTokenExpired,
} from "./helpers/authentication"
import useAppSelector from "./hooks/useAppSelector"
import useAppDispatch from "./hooks/useAppDispatch"
import { handleLogin, handleLogout } from "./store/authSlice"
import Login from "./pages/Login"
import ManageTeams from "./pages/ManageTeams"
import EmployeeDashboard from "./pages/EmployeeDasbhboard"
import SetPassword from "./pages/SetPassword"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      // ➡️ The Parent Loader now checks the current path before redirecting
      loader: async ({ request }) => {
        // Get the current path (e.g., '/', '/login', '/admin/manage-teams')
        const pathname = new URL(request.url).pathname

        // 1. Check if the user is logged in
        if (await isLoggedIn()) {
          if (await isAdmin()) {
            if (pathname === "/") {
              return redirect("/admin/manage-teams", {
                replace: true,
              } as ResponseInit)
            }
          } else {
            if (pathname === "/") {
              return redirect("/employee-dashboard", {
                replace: true,
              } as ResponseInit)
            }
          }

          return null
        }

        return null
      },
      children: [
        {
          index: true,
          element: <CompanyRegistration />,
          // No loader needed here anymore
        },
        {
          path: "/login",
          element: <Login />,
          loader: async () => {
            if (await isLoggedIn()) {
              // If a user manually types /login but is already logged in:
              // You can decide the default behavior here.
              // if (await isAdmin()) {
              //   return redirect("/admin/manage-teams", {
              //     replace: true,
              //   } as ResponseInit);
              // }
              return redirect("/employee-dashboard", {
                replace: true,
              } as ResponseInit)
            }
            return null
          },
          // No loader needed here anymore
        },
        {
          path: "/set-password",
          element: <SetPassword />,
          loader: async () => {
            if (!(await checkSpecialToken()) && !(await isLoggedIn())) {
              return redirect("/login", {
                replace: true,
              } as ResponseInit)
            } else if (await isLoggedIn()) {
              return redirect("/employee-dashboard", {
                replace: true,
              } as ResponseInit)
            }
            return null
          },
        },
        {
          path: "/admin/manage-teams",
          element: <ManageTeams />,
          // This loader now ONLY focuses on the Admin check
          loader: async () => {
            if (!(await isAdmin())) {
              return redirect("/login", {
                replace: true,
              } as ResponseInit)
            }
          },
        },
        {
          path: "/employee-dashboard",
          element: <EmployeeDashboard />,
          // This loader now ONLY focuses on the IsLoggedIn check
          loader: async () => {
            if (!(await isLoggedIn())) {
              return redirect("/login", {
                replace: true,
              } as ResponseInit)
            }
          },
        },
      ],
    },
  ])

  let auth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    // handle refresh page token logic here
    console.log("getTokenFromLocalStorage():", getTokenFromLocalStorage())
    console.log("isTokenExpired():", isTokenExpired())
    if (getTokenFromLocalStorage() && !isTokenExpired() && !auth.token) {
      let localToken = getTokenFromLocalStorage()
      let expirationTime = getExpirationTimeFromLocalStorage()
      dispatch(
        handleLogin({
          token: localToken as string,
          expirationTime: expirationTime as number,
        })
      )
    }
  }, [])

  // token logic for expiry
  useEffect(() => {
    if (!auth.token) {
      return
    }
    console.log("is token expired:", isTokenExpired())
    if (isTokenExpired()) {
      // dispathc logout
      dispatch(handleLogout())
      redirect("/")
      return
    }
    let remainingTime = getRemainingExpirationTime()
    const lastTimeout = setTimeout(() => {
      dispatch(handleLogout())
      redirect("/")
      return
    }, remainingTime)
    return () => clearTimeout(lastTimeout)
  }, [auth.token])
  return <RouterProvider router={router} />
}

export default App
