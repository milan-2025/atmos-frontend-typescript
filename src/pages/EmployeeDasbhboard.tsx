// import KudoFeed from "@/components/my-components/KudoFeed"
import KudoLiveFeed from "@/components/my-components/KudoLiveFeed"
import SendKudoComponent from "@/components/my-components/SendKudoComponent"
import { Button } from "@/components/ui/button"
// import { ScrollArea } from "@/components/ui/scroll-area"

import {
  // CandlestickChart,
  // Cross,
  Goal,
  HeartPulse,
  PartyPopper,
  // Send,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
// import { data } from "react-router"

const EmployeeDashboard: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    console.log("ref--", ref)
    if (ref.current) {
      const measuredH = ref.current.offsetHeight
      setHeight(measuredH)
    }
  }, [])

  return (
    <div
      id="employee-dashboard-outer-container"
      className="flex  w-full justify-center"
    >
      <div
        id="employee-dashboard-inner-container"
        className="flex flex-col w-10/12 mb-11"
      >
        <div id="intro-upper-row" className="flex flex-col w-full">
          <h1 className="md:text-2xl text-xl  text-gray-200 font-medium">
            Hello Milan
          </h1>
          <div className="text-sm[1em] mt-1 text-gray-400">
            Here is a summary of your activity today.
          </div>
        </div>

        <div className="flex md:flex-row flex-col w-full mt-5  gap-6">
          <div
            ref={ref}
            id="left-panel"
            className="flex flex-col md:w-2/3 h-fit w-full gap-6"
          >
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-5 md:space-y-0">
              <div
                id="kudos-sent"
                className="bg-blue-400/20 p-4 pl-6 md:flex-1 space-y-4 rounded-xl text-gray-300"
              >
                <div className="flex flex-row w-full">
                  <span className="text-blue-400 pr-3 pt-0.5">
                    <PartyPopper />
                  </span>
                  <span>Kudos Sent This Week.</span>
                </div>

                <div className="text-2xl">12</div>
              </div>

              <div
                id="pulse-check-streak"
                className="bg-blue-400/20 p-4 pl-6 md:flex-1  space-y-4  rounded-xl text-gray-300"
              >
                <div className="flex flex-row w-full">
                  <span className="text-blue-400 pr-3 pt-0.5">
                    <Goal />
                  </span>
                  <span>Your Pulse Streak.</span>
                </div>

                <div className="text-2xl">5 Days</div>
              </div>
            </div>

            <div
              id="pulse-check"
              className="bg-blue-400/20 flex-col w-full p-6 rounded-xl"
            >
              <div className="flex flex-col md:flex-row  w-full">
                <div className="text-lg  text-gray-300 font-medium">
                  How are you feeling today?
                </div>
                <div className="mt-3 md:mt-0 md:ml-auto">
                  <Button className="bg-emerald-400 hover:bg-emerald-400/75 ring-0 focus-visible:ring-0 cursor-pointer text-secondary-foreground">
                    <HeartPulse /> Take Today's Pulse Check
                  </Button>
                </div>
              </div>
              <div className="md:mt-1 mt-3">
                <div className="text-gray-400">Your Pulse Trend</div>
                <div className="mt-0.5 text-2xl text-gray-200 font-medium">
                  Feeling Great
                </div>
                <div className="text-gray-400 mt-0.5">
                  Last 7 days<span className="text-emerald-400"> +5%</span>
                </div>
              </div>
            </div>

            {/* // kudo sending form below */}

            <SendKudoComponent />
          </div>
          <div
            id="righ-panel"
            className={`flex flex-col  md:w-1/3  w-full`}
            style={{
              height: height > 0 ? `${height}px` : "auto",
            }}
          >
            {/* Live kudos below */}
            <KudoLiveFeed height={height} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard
