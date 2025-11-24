import { MenuIcon } from "lucide-react"
import MyDrawer from "./MyDrawer"
import { useState } from "react"
// import useAppSelector from "@/hooks/useAppSelector";

import logo from "../../assets/logo.png"
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleclose = () => setIsOpen(false)

  return (
    <>
      <nav
        id="navbar"
        className="flex pl-3 flex-row w-full py-1 border-b items-center border-gray-400"
      >
        <div className="flex">
          <MenuIcon
            onClick={() => {
              handleOpen()
            }}
            color="#99a1af"
            className="cursor-pointer"
          />
        </div>
        <div className="flex  flex-row w-full md:justify-center pl-1 md:pl-1">
          <div className="flex w-10/12 md:ml-[-5em] text-gray-200 font-medium p-0">
            <img src={logo} alt="logo" className="w-40 h-11" />
          </div>
        </div>
      </nav>
      <MyDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleclose={handleclose}
      />
    </>
  )
}

export default Navbar
