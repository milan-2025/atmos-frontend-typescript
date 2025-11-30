import { Heart, User2 } from "lucide-react"
import { Button } from "../ui/button"

interface IKudo {
  _id: string
  from: string
  to: string
  message: string
  createdAt: string
}
const KudoFeed: React.FC<{ kudo: IKudo }> = ({ kudo }) => {
  return (
    <>
      <div
        id="kudo-feed"
        className="bg-stone-300/30 p-2 md:p-3 rounded-lg mt-3"
      >
        <div id="users-info">
          <div
            id="from-user-info"
            className="flex flex-row w-full text-stone-200"
          >
            <User2 />
            {kudo.from}, to
          </div>
          <div
            id="to-user-info"
            className="flex flex-row w-full mt-1 text-stone-200"
          >
            <User2 />
            {kudo.to}
          </div>
        </div>

        <div
          id="kudo-message"
          className="bg-primary p-2 rounded-lg mt-2 w-full text-justify text-stone-300"
        >
          {kudo.message}
        </div>

        <div
          id="footer"
          className="flex flex-row w-full mt-3 justify-between items-center"
        >
          {/* <Button
            // size={"icon"}
            className="text-rose-500 bg-rose-500/20 rounded-2xl hover:bg-rose-500/40 cursor-pointer"
          >
            <Heart className="text-rose-500 " /> 5
          </Button> */}

          <span className="text-stone-300">
            {new Date(kudo.createdAt).toDateString()}
          </span>
        </div>
      </div>
    </>
  )
}

export default KudoFeed
