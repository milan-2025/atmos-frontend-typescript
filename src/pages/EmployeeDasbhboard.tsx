// import KudoFeed from "@/components/my-components/KudoFeed"
import KudoLiveFeed from "@/components/my-components/KudoLiveFeed";
import PulseCheckComponent from "@/components/my-components/PulseCheckComponent";
import SendKudoComponent from "@/components/my-components/SendKudoComponent";
// import { useSocket } from "@/context/SocketContext"
// import { Button } from "@/components/ui/button"
import useAppSelector from "@/hooks/useAppSelector";
// import { ScrollArea } from "@/components/ui/scroll-area"

import {
  // CandlestickChart,
  // Cross,
  Goal,
  // HeartPulse,
  PartyPopper,
  // Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const EmployeeDashboard: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const name = useAppSelector((state) => state.auth.fullName);
  useEffect(() => {
    console.log("ref--", ref);
    if (ref.current) {
      const measuredH = ref.current.offsetHeight;
      setHeight(measuredH);
    }
  }, []);

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
          <h1 className="md:text-2xl text-xl  text-gray-200 font-medium">{`Hello ${
            name?.split(" ")[0]
          }`}</h1>
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
            {/* //pulse check component below */}
            <PulseCheckComponent />

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
            <KudoLiveFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
