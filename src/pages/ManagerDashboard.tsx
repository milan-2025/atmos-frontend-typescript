import DonutPieChart from "@/components/my-components/DonutPieChart";
import LoadingScreen from "@/components/my-components/LoadingScreen";
import { Button } from "@/components/ui/button";
import { startMeetingHandler } from "@/http/apiHandlers";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const ManagerDashboard: React.FC = () => {
  const { mutate, isError, reset, isPending } = useMutation({
    mutationFn: startMeetingHandler,
    retry: false,
    onSuccess: (data) => {
      console.log("after meeting started data", data);
    },
  });

  const handleStartMeet = () => {
    mutate();
  };

  if (isError) {
    toast.error("Some error occurred while starting meeting.", {
      classNames: {
        toast: "!bg-red-400 !text-gray-100 !border-0",
      },
      position: "top-right",
    });
    reset();
  }
  return (
    <>
      {isPending && <LoadingScreen />}
      <div
        id="manager-dashboard-outer-container"
        className="flex  w-full justify-center"
      >
        <div
          id="manager-dashboard-inner-container"
          className="flex flex-col w-10/12 mb-11"
        >
          <div
            id="intro-upper-row"
            className="flex flex-row items-center w-full mt-3"
          >
            <div className="flex flex-col">
              <h1 className="md:text-2xl text-xl  text-gray-200 font-medium">{`Your Team's Live Pulse
            `}</h1>
              <div className="text-sm[1em] mt-1 text-gray-400">
                Real Time Insigights into your team's workload and well being.
              </div>
            </div>
            <div className="ml-auto">
              <Button
                onClick={handleStartMeet}
                className="bg-emerald-400 hover:bg-emerald-400/75 ring-0 focus-visible:ring-0 cursor-pointer text-secondary-foreground"
              >
                Start Live Q/A Session
              </Button>
            </div>
          </div>
          <div className="flex flex-row w-full">
            <div className="bg-blue-500/20 p-4 mt-5 flex flex-col w-2/3 rounded-xl">
              <div className="text-lg text-gray-200 font-medium">
                Current Worlkload Status
              </div>
              <div className="text-sm text-gray-400 ">
                Breakdown of your team's current workload status.
              </div>
              <div className="w-full mx-auto h-[342px] relative">
                <div className="absolute inset-0 bottom-5 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-5xl font-bold text-gray-200 mb-1 leading-none">
                    {40}
                  </span>
                  <span className="text-sm text-gray-400">Total Members</span>
                </div>
                <DonutPieChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard;
