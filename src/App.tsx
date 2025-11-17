import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import "./App.css";
import RootLayout from "./pages/RootLayout";
import CompanyRegistration from "./pages/CompanyRegistration";
import { useEffect } from "react";
import {
  getExpirationTimeFromLocalStorage,
  getRemainingExpirationTime,
  getTokenFromLocalStorage,
  isTokenExpired,
} from "./helpers/authentication";
import useAppSelector from "./hooks/useAppSelector";
import useAppDispatch from "./hooks/useAppDispatch";
import { handleLogin, handleLogout } from "./store/authSlice";
import Login from "./pages/Login";
import ManageTeams from "./pages/ManageTeams";

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
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/admin/manage-teams",
          element: <ManageTeams />,
        },
      ],
    },
  ]);

  let auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // handle refresh page token logic here
    console.log("getTokenFromLocalStorage():", getTokenFromLocalStorage());
    console.log("isTokenExpired():", isTokenExpired());
    if (getTokenFromLocalStorage() && !isTokenExpired() && !auth.token) {
      let localToken = getTokenFromLocalStorage();
      let expirationTime = getExpirationTimeFromLocalStorage();
      dispatch(
        handleLogin({
          token: localToken as string,
          expirationTime: expirationTime as number,
        })
      );
    }
  }, []);

  // token logic for expiry
  useEffect(() => {
    if (!auth.token) {
      return;
    }
    console.log("is token expired:", isTokenExpired());
    if (isTokenExpired()) {
      // dispathc logout
      dispatch(handleLogout());
      redirect("/");
      return;
    }
    let remainingTime = getRemainingExpirationTime();
    const lastTimeout = setTimeout(() => {
      dispatch(handleLogout());
      redirect("/");
      return;
    }, remainingTime);
    return () => clearTimeout(lastTimeout);
  }, [auth.token]);
  return <RouterProvider router={router} />;
}

export default App;
