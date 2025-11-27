import { useEffect, useState } from "react"
import { ScrollArea } from "../ui/scroll-area"
import KudoFeed from "./KudoFeed"
import { getTokenFromLocalStorage } from "@/helpers/authentication"
import { toast } from "sonner"
import LoadingScreen from "./LoadingScreen"
import { useSocket, type IKudo } from "@/context/SocketContext"
import links from "@/helpers/links"

const KudoLiveFeed: React.FC<{
  height: number
}> = ({ height }) => {
  //   let arr = [1, 2, 3, 4, 5, 6, 7]
  const backendurl = links.backendbaseUrlRemote
  const [isLoading, setIsLoading] = useState(false)
  const [kudos, setKudos] = useState<IKudo[]>([])
  useEffect(() => {
    getKudos()
  }, [])
  const getKudos = async () => {
    let token = getTokenFromLocalStorage()
    let data
    if (!token) {
      toast.error("Some error occurred", {
        classNames: {
          toast: "!bg-red-400 !text-gray-100 !border-0",
        },
        position: "top-right",
      })
    }
    setIsLoading(true)
    const response = await fetch(`${backendurl}/api/admin/kudos/get-kudos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setIsLoading(false)

    if (!response.ok) {
      // let err = await.
      // console.log('err while getting kudos,')
      toast.error("Some error  while getting kudos.", {
        classNames: {
          toast: "!bg-red-400 !text-gray-100 !border-0",
        },
        position: "top-right",
      })
    }

    if (response.ok) {
      data = await response.json()
      if (data.kudos.length > 0) {
        console.log(data.kudos)
        setKudos(data.kudos)
      }
    }
  }

  // for getting real time kudo
  const socket = useSocket()
  useEffect(() => {
    if (!socket) {
      return
    }
    socket.on("kudo_added", (data) => {
      console.log("new kudo added", data)
      setKudos((oldKudo) => {
        let newKudos = [data.kudoData, ...oldKudo]
        newKudos.splice(newKudos.length - 1, 1)
        return newKudos
      })
    })
    // cleanup code to avoid component unmount errors and duplicates
    return () => {
      socket.off("kudo_added", (data) => {
        console.log("socket closed with data", data)
      })
    }
  }, [socket])
  return (
    <>
      {isLoading && <LoadingScreen />}
      <div
        id="live-kudo-container"
        className="bg-blue-400/20 p-4 flex flex-col w-full  rounded-xl"
      >
        <div className="text-gray-200 text-xl font-medium">Live Kudo Feed</div>
        <ScrollArea
          style={{
            height: height > 0 ? `${height - 60}px` : "auto",
          }}
        >
          {kudos.length > 0 &&
            kudos.map((kudo: any) => {
              return <KudoFeed key={kudo._id} kudo={kudo} />
            })}
        </ScrollArea>
      </div>
    </>
  )
}

export default KudoLiveFeed
