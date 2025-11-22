import { Heart, User2 } from "lucide-react"
import { Button } from "../ui/button"

const KudoFeed: React.FC = () => {
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
            milansinghdav@gmail.com, to
          </div>
          <div
            id="to-user-info"
            className="flex flex-row w-full mt-1 text-stone-200"
          >
            <User2 />
            milandeepbhalla@outlook.com
          </div>
        </div>

        <div
          id="kudo-message"
          className="bg-primary p-2 rounded-lg mt-2 w-full text-justify text-stone-300"
        >
          Some message to thank a particular person it can be any thing. ..
          .slnjda ndkj.dedmedjd, dejnedn , em denje kemdkem
        </div>

        <div
          id="footer"
          className="flex flex-row w-full mt-3 justify-between items-center"
        >
          <Button
            // size={"icon"}
            className="text-rose-500 bg-rose-500/20 rounded-2xl hover:bg-rose-500/40 cursor-pointer"
          >
            <Heart className="text-rose-500 " /> 5
          </Button>

          <span className="text-stone-300">21st Nov, 7:30pm</span>
        </div>
      </div>
    </>
  )
}

export default KudoFeed
