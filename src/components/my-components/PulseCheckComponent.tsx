import { Check, HeartPulse } from "lucide-react"
import { Button } from "../ui/button"
import { useQuery } from "@tanstack/react-query"
import { getTokenFromLocalStorage } from "@/helpers/authentication"
import { checkcanAddPulse } from "@/http/apiHandlers"
// import { toast } from "sonner"
import LoadingScreen from "./LoadingScreen"
import CheckPulseModal from "./CheckPulseModal"
import { useState } from "react"
import { TrendLineChart } from "./TrendLineChart"

const PulseCheckComponent: React.FC = () => {
  let token = getTokenFromLocalStorage()

  const { data, isError, isLoading } = useQuery({
    queryKey: ["your-pulse-data", token],
    queryFn: checkcanAddPulse,
    retry: false,
    staleTime: Infinity,
  })
  if (isError) {
    //@ts-ignore
    // console.log("errpr while pulse check--", error.info)
    // toast.error("Error while checking pulse data.", {
    //   classNames: {
    //     toast: "!bg-red-400 !text-gray-100 !border-0",
    //   },
    //   position: "top-right",
    // })
  }
  if (data) {
    console.log("data after check--", data)
  }

  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleOpenCheckPulseModal = () => {
    setIsOpen(true)
  }
  return (
    <>
      {isLoading && <LoadingScreen />}
      <div
        id="pulse-check"
        className="bg-blue-400/20 flex-col w-full p-6 rounded-xl"
      >
        <div className="flex flex-col items-center md:items-start md:flex-row  w-full">
          <div className="text-lg  text-gray-300 font-medium">
            How are you feeling today?
          </div>
          <div className="mt-3 md:mt-0 md:ml-auto">
            {!isError && (
              <Button
                onClick={handleOpenCheckPulseModal}
                className="bg-emerald-400 hover:bg-emerald-400/75 ring-0 focus-visible:ring-0 cursor-pointer text-secondary-foreground"
              >
                <HeartPulse /> Take Today's Pulse Check
              </Button>
            )}
            {isError && (
              <Button className="bg-emerald-400 hover:bg-emerald-400/75 ring-0 focus-visible:ring-0  text-secondary-foreground">
                <Check /> Pulse check already taken for today
              </Button>
            )}
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
          <TrendLineChart />
        </div>
      </div>
      <CheckPulseModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClose={handleClose}
      />
    </>
  )
}

export default PulseCheckComponent
