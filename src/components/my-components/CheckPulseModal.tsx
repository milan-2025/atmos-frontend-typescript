import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { IBasicModal } from "@/interfaces/componentsinerfaces"
import { Button } from "../ui/button"
import PulseResponseButton from "./PulseResponseButton"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { queryClient, submitPulseCheckHandler } from "@/http/apiHandlers"
import { toast } from "sonner"
import LoadingScreen from "./LoadingScreen"
// import type { checkcanAddPulse } from "@/http/apiHandlers"
const CheckPulseModal: React.FC<IBasicModal> = ({
  isOpen,
  setIsOpen,
  handleClose,
}) => {
  const handleCancel = () => {
    handleClose()
  }

  const handleOnChange = (newState: boolean) => {
    if (!newState) {
      // handleCancel()
      //   setFullName("");
      //   setEmail("");
      //   setServerFieldErrors({});
      handleCancel()
    }
    setIsOpen(newState)
  }

  const [selectedResponse, setSelectedResponse] = useState("Getting Busy")
  const [inValidatingQueries, setInvalidtingQueries] = useState(false)

  const { mutate, isPending, isError, reset } = useMutation({
    mutationFn: submitPulseCheckHandler,
    onSuccess: (data) => {
      console.log("data after succesfull pulse check---", data)
      setInvalidtingQueries(true)
      queryClient
        .invalidateQueries({
          queryKey: ["your-pulse-data"],
        })
        .then(() => {
          setInvalidtingQueries(false)
          toast.success("Pulse check Taken", {
            classNames: {
              toast: "!bg-green-500 !text-gray-100 !border-0",
            },
            position: "top-right",
          })
          handleCancel()
        })
    },
  })

  if (isError) {
    toast.error("Some error occurred while adding pulse response.", {
      classNames: {
        toast: "!bg-red-400 !text-gray-100 !border-0",
      },
      position: "top-right",
    })
    reset()
  }

  const handleAdd = () => {
    mutate({
      pulseResponse: selectedResponse.trim(),
    })
  }
  return (
    <>
      {(isPending || inValidatingQueries) && <LoadingScreen />}
      <Dialog open={isOpen} onOpenChange={handleOnChange}>
        <DialogContent
          onEscapeKeyDown={(e) => {
            e.preventDefault()
          }}
          onPointerDownOutside={(e) => {
            e.preventDefault()
          }}
          className="sm:max-w-[425px] bg-[#141E27] text-gray-100"
        >
          <DialogHeader>
            <DialogTitle>How was your workload today?</DialogTitle>
            <DialogDescription className="text-gray-400">
              Your response is 100% anonymous and help us support the team
            </DialogDescription>
          </DialogHeader>

          {/* The Body (Your form fields, text, etc., go here) */}
          <div className="flex md:flex-row flex-col justify-between">
            {/* Example of content structure */}
            <PulseResponseButton
              onClick={() => setSelectedResponse("Feeling Good")}
              variant="success"
              isSelected={selectedResponse == "Feeling Good"}
            />
            <PulseResponseButton
              onClick={() => setSelectedResponse("Getting Busy")}
              variant="default"
              isSelected={selectedResponse == "Getting Busy"}
            />
            <PulseResponseButton
              onClick={() => setSelectedResponse("Overwhelmed")}
              variant="danger"
              isSelected={selectedResponse == "Overwhelmed"}
            />
          </div>

          {/* The Footer (Action buttons) */}
          <DialogFooter className="mt-2">
            <Button
              onClick={handleCancel}
              //   disabled={isPending}
              className="bg-red-500 hover:bg-red-500/70 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              //   disabled={isPending}
              className="bg-green-400 hover:bg-green-400/70 text-black cursor-pointer"
            >
              Submit Anonymously
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CheckPulseModal
