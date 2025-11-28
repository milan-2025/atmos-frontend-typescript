import { useSocket } from "@/context/SocketContext"
import useAppSelector from "@/hooks/useAppSelector"
import { useEffect } from "react"
// import { useNavigate } from "react-router"

const QAMeeting: React.FC = () => {
  const teamId = useAppSelector((state) => state.auth.teamID)
  const token = useAppSelector((state) => state.auth.token)

  let socket = useSocket()
  useEffect(() => {
    if (!socket) return

    // const handleUserJoined = (data: any) => {
    //   console.log("data from user joined", data)
    //   // show alert
    //   //   setIsMeetingAlertOpen(true)
    // }
    const handleUserLeft = (data: any) => {
      console.log("data from user left ", data)
    }
    // console.log("meeting_started_" + teamId)

    socket.on("user_left_" + teamId, handleUserLeft)

    return () => {
      //   socket.off("user_joined_" + teamId, handleUserJoined)
      socket.off("user_left_" + teamId, handleUserLeft)
      socket.emit("user-left", {
        token: token,
        teamId: teamId,
      })
    }
  }, [socket])
  return (
    <>
      <div
        id="QA-Meeting-outer-container"
        className="flex  w-full justify-center"
      >
        <div
          id="QA-Meeting-inner-container"
          className="flex flex-col w-10/12 mb-11"
        >
          Welcome to Live QA Meet
        </div>
      </div>
    </>
  )
}

export default QAMeeting
