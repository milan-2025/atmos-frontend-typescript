export interface IKudo {
  from: string
  to: string
  message: string
  visibility: string
}

export interface IServerToClientEvents {
  kudo_added: (data: { kudoData: IKudo }) => void
}

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { io, Socket } from "socket.io-client"
// import { ServerToClientEvents, ClientToServerEvents } from "../types/socket";

// Typed Socket Instance
type SocketType = Socket<IServerToClientEvents> | null

const SocketContext = createContext<SocketType>(null)

export const useSocket = () => useContext(SocketContext)

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<SocketType>(null)

  useEffect(() => {
    const newSocket: SocketType = io("http://localhost:3000", {
      transports: ["websocket"],
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
