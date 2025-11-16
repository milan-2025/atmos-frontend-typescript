import { createBrowserRouter, redirect, RouterProvider } from "react-router"
import "./App.css"
import RootLayout from "./pages/RootLayout"
import CompanyRegistration from "./pages/CompanyRegistration"
import { useEffect } from "react"
import { getExpirationTimeFromLocalStorage, getRemainingExpirationTime, getTokenFromLocalStorage, isTokenExpired } from "./helpers/authentication"
import useAppSelector from "./hooks/useAppSelector"
import useAppDispatch from "./hooks/useAppDispatch"
import { handleLogin, handleLogout } from "./store/authSlice"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <CompanyRegistration />,
        },
      ],
    },
  ])

  let token = useAppSelector((state)=>state.auth.token)
  const dispatch = useAppDispatch()
  useEffect(()=>{
    // handle refresh page token logic here
    if(getTokenFromLocalStorage() && !isTokenExpired() && !token){
      let localToken = getTokenFromLocalStorage();
      let expirationTime = getExpirationTimeFromLocalStorage();
      dispatch(handleLogin({
        token: localToken as string,
        expirationTime: expirationTime as number
      }))
    }
  },[])

  // token logic for expiry 
  useEffect(()=>{
    if(!token){
      return;
    }
    if(isTokenExpired()){
      // dispathc logout
      dispatch(handleLogout())
      redirect("/");
      return
    }
    let remainingTime = getRemainingExpirationTime();
    const lastTimeout = setTimeout(()=>{
      dispatch(handleLogout())
      redirect("/");
      return ;
    },remainingTime)
    return ()=>clearTimeout(lastTimeout);
  },[token])
  return <RouterProvider router={router} />
}

export default App
