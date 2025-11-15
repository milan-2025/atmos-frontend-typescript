import Navbar from "@/components/my-components/Navbar"
import { Outlet } from "react-router"
import { Toaster } from "sonner"

const RootLayout: React.FC = () => {
  return (
    <>
      <header>
        <Navbar />
        <Toaster />
      </header>
      <main className="mt-4">
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
