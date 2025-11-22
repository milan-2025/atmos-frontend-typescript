import KudoFeed from "@/components/my-components/KudoFeed"
import MyInput from "@/components/my-components/MyInput"
import MyRadioBarButton from "@/components/my-components/MyRadioBarButton"
import MyTextarea from "@/components/my-components/MyTextarea"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  // CandlestickChart,
  // Cross,
  Goal,
  HeartPulse,
  PartyPopper,
  // Send,
  SendHorizonal,
  X,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

const EmployeeDashboard: React.FC = () => {
  const [visibility, setSelectedVisibility] = useState("Public")
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    console.log("ref--", ref)
    if (ref.current) {
      const measuredH = ref.current.offsetHeight
      setHeight(measuredH)
    }
  }, [])
  let arr = [1, 2, 3, 4, 5, 6, 7]
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

            <div className="bg-blue-400/20 rounded-xl md:p-6 p-5 flex-col">
              <div className="text-lg  text-gray-200 font-medium">
                Send a Kudo
              </div>
              <div className="mt-4 md:pl-2">
                <MyInput
                  id="to"
                  title="To:"
                  placeholder="eg. milansinghdav@gmail.com"
                  helperText="Enter email of your collegue."
                />
              </div>
              <div className="mt-2 md:pl-2">
                <MyTextarea
                  id="message"
                  title="Your Message:"
                  placeholder="write your message..."
                  style={{
                    height: "7.5em",
                  }}
                />
              </div>

              <div className="mt-2 md:pl-2">
                <div className="text-gray-300 text-sm[1.3em] pl-0.5 font-medium">
                  Visibility:
                </div>

                <div
                  id="visibility-radio-group"
                  className="flex md:flex-row flex-col w-full gap-4 mt-3"
                >
                  <MyRadioBarButton
                    title="Public"
                    text="Your kudo's identity will be visible to all team members."
                    isSelected={visibility == "Public"}
                    onClick={() => {
                      setSelectedVisibility("Public")
                    }}
                  />
                  <MyRadioBarButton
                    title="Private"
                    text="Add an anonymous Kudo only you and receiver knows who sent the kudo."
                    isSelected={visibility == "Private"}
                    onClick={() => {
                      setSelectedVisibility("Private")
                    }}
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-row justify-end gap-2">
                <Button className="bg-red-400 hover:bg-red-400/75 ring-0 focus-visible:ring-0 cursor-pointer text-accent">
                  Cancel
                  <X />
                </Button>
                <Button className="bg-emerald-400 hover:bg-emerald-400/75 ring-0 focus-visible:ring-0 cursor-pointer text-secondary-foreground">
                  Send Kudo <SendHorizonal />
                </Button>
              </div>
            </div>
          </div>
          <div
            id="righ-panel"
            className={`flex flex-col  md:w-1/3  w-full`}
            style={{
              height: height > 0 ? `${height}px` : "auto",
            }}
          >
            {/* Live kudos below */}

            <div
              id="live-kudo-container"
              className="bg-blue-400/20 p-4 flex flex-col w-full  rounded-xl"
            >
              <div className="text-gray-200 text-xl font-medium">
                Live Kudo Feed
              </div>
              <ScrollArea
                style={{
                  height: height > 0 ? `${height - 60}px` : "auto",
                }}
              >
                {arr.map((item) => {
                  return <KudoFeed key={item} />
                })}
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard
