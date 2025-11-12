import { MenuIcon } from "lucide-react"

const Navbar: React.FC = () => {
  return (
    <>
      <nav
        id="navbar"
        className="flex pl-3 flex-row w-full py-3 border-b border-gray-400"
      >
        <div className="flex">
          <MenuIcon color="#99a1af" />
        </div>
        <div className="flex flex-row w-full justify-center">
          <div className="flex w-10/12 ml-[-3.5em] text-gray-200 font-medium">
            Atmos-Logo
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
