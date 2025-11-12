import Navbar from "@/components/my-components/Navbar"
import { Outlet } from "react-router"

const RootLayout: React.FC = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="mt-4">
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
