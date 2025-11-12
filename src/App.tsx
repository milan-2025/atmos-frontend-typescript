import { createBrowserRouter, RouterProvider } from "react-router"
import "./App.css"
import RootLayout from "./pages/RootLayout"
import CompanyRegistration from "./pages/CompanyRegistration"

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
  return <RouterProvider router={router} />
}

export default App
