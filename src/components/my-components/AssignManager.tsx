// import { Tooltip } from "recharts"
import { ShieldCheck } from "lucide-react"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { useState } from "react"
import AssignManagerModal from "./AssignManagerModal"
import type { IAddMemberButtonProps } from "@/interfaces/componentsinerfaces"

const AssignManager: React.FC<IAddMemberButtonProps> = ({ team }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={team.size == 0 || team.hasOwnProperty("managerId")}
            size={"icon"}
            onClick={handleOpen}
            className="bg-blue-400 hover:bg-blue-400/70 text-white font-bold cursor-pointer rounded-2xl"
          >
            <ShieldCheck className="size-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Assign Manager</p>
        </TooltipContent>
      </Tooltip>
      <AssignManagerModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClose={handleClose}
        team={team}
      />
    </>
  )
}

export default AssignManager
