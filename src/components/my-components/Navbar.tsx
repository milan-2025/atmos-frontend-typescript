import { MenuIcon, Radio } from "lucide-react"
import MyDrawer from "./MyDrawer"
import { useEffect, useState } from "react"
// import useAppSelector from "@/hooks/useAppSelector";

import logo from "../../assets/logo.png"
import { useSocket } from "@/context/SocketContext"
import useAppSelector from "@/hooks/useAppSelector"
import { MyAlert } from "./MyAlert"
// import { Button } from "../ui/button"
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMeetingAlertOpen, setIsMeetingAlertOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleclose = () => setIsOpen(false)
  const teamId = useAppSelector((state) => state.auth.teamID)

  const socket = useSocket()

  useEffect(() => {
    if (!socket) return

    const handleMeetingStarted = (data: any) => {
      console.log("data from meeting started", data)
      // show alert
      setIsMeetingAlertOpen(true)
    }
    console.log("meeting_started_" + teamId)
    socket.on("meeting_started_" + teamId, handleMeetingStarted)

    const handleUserJoined = (data: any) => {
      console.log("data from user joined", data)
      // show alert
      //   setIsMeetingAlertOpen(true)
    }
    socket.on("user_joined_" + teamId, handleUserJoined)

    return () => {
      socket.off("meeting_started_" + teamId, handleMeetingStarted)
      socket.off("user_joined_" + teamId, handleUserJoined)
    }
  }, [socket])

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
          <div className="flex w-10/12 md:ml-[-5em] items-center flex-row text-gray-200 font-medium p-0">
            <img src={logo} alt="logo" className="w-40 h-11" />
            <div className="ml-auto  flex flex-row items-center text-red-500 gap-1 cursor-pointer">
              <Radio className=" size-5 mt-0.5" /> Live QA
            </div>
          </div>
        </div>
      </nav>
      <MyDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleclose={handleclose}
      />
      <MyAlert isOpen={isMeetingAlertOpen} setIsOpen={setIsMeetingAlertOpen} />
    </>
  )
}

export default Navbar
