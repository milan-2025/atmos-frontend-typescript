import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import type { IAddMemberModalProps } from "@/interfaces/componentsinerfaces"
import AutoCompleteComponent from "./AutoCompleteComponent"
import { useState } from "react"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { AssignManagerHandler, queryClient } from "@/http/apiHandlers"
import LoadingScreen from "./LoadingScreen"
const AssignManagerModal: React.FC<IAddMemberModalProps> = ({
  isOpen,
  setIsOpen,
  handleClose,
  team,
}) => {
  const handleCancel = () => {
    setSelectedMember(null)
    handleClose()
  }

  const handleOnChange = (newState: boolean) => {
    if (!newState) {
      handleCancel()
    }
    setIsOpen(newState)
  }
  const [inValiditaingQueries, setInvalidatingQueries] = useState(false)
  const { mutate, isError, reset, isPending } = useMutation({
    mutationFn: AssignManagerHandler,
    retry: false,
    onSuccess: () => {
      setInvalidatingQueries(true)
      queryClient
        .invalidateQueries({
          queryKey: ["teams-members"],
        })
        .then(() => {
          setInvalidatingQueries(false)
          toast.success("Manager Assigned.", {
            classNames: {
              toast: "!bg-green-500 !text-gray-100 !border-0",
            },
            position: "top-right",
          })
        })
    },
  })

  if (isError) {
    toast.error("Error while assigning a manager.", {
      classNames: {
        toast: "!bg-red-400 !text-gray-100 !border-0",
      },
      position: "top-right",
    })
    reset()
  }

  const handleAssign = () => {
    if (!selectedMember) {
      toast.error("Select a member first by searching.", {
        classNames: {
          toast: "!bg-red-400 !text-gray-100 !border-0",
        },
        position: "top-right",
      })

      return
    }

    console.log("can assign now", {
      assignManager: selectedMember,
    })
    mutate({
      userId: selectedMember._id,
      teamId: selectedMember.teamId,
    })
  }

  const [selectedMember, setSelectedMember] = useState<any>(null)

  return (
    <>
      {(isPending || inValiditaingQueries) && <LoadingScreen />}
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
            <DialogTitle>Add Member</DialogTitle>
            <DialogDescription className="text-gray-400">
              Organize Employees into Teams for better management.
            </DialogDescription>
          </DialogHeader>

          {/* The Body (Your form fields, text, etc., go here) */}
          <div className="flex flex-col mt-2">
            {/* Example of content structure */}
            <AutoCompleteComponent
              teamId={team._id}
              setSelectedMember={setSelectedMember}
            />
            {selectedMember && (
              <div className="bg-blue-500/20 p-4 rounded-2xl flex flex-col mt-4">
                <div className="text-gray-200">Selected Member</div>
                <div>
                  <div className="text-gray-400">{selectedMember.fullName}</div>
                  <div className="text-gray-400">{selectedMember.email}</div>
                </div>
              </div>
            )}
          </div>

          {/* The Footer (Action buttons) */}
          <DialogFooter className="mt-2">
            <Button
              onClick={handleCancel}
              //   disabled={isPending}
              className="bg-red-500 hover:bg-red-500/70 cursor-pointer"
            >
              Cancels
            </Button>
            <Button
              onClick={handleAssign}
              //   disabled={isPending}
              className="bg-green-400 hover:bg-green-400/70 text-black cursor-pointer"
            >
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AssignManagerModal
