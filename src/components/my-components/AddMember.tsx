import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import AddMemberModal from "./AddMemeberModal";
import { useState } from "react";
import type { IAddMemberButtonProps } from "./componentsinerfaces";

const AddMember: React.FC<IAddMemberButtonProps> = ({ team }) => {
  const [openAddMemberModal, setOpenAddMemberModal] = useState(false);
  const handleOpen = () => {
    setOpenAddMemberModal(true);
  };
  const handleClose = () => {
    setOpenAddMemberModal(false);
  };
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleOpen}
            size={"icon"}
            className="bg-emerald-400 hover:bg-emerald-400/70 text-black font-bold cursor-pointer rounded-2xl"
          >
            <Plus className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Member</p>
        </TooltipContent>
      </Tooltip>
      <AddMemberModal
        isOpen={openAddMemberModal}
        setIsOpen={setOpenAddMemberModal}
        handleClose={handleClose}
        team={team}
      />
    </>
  );
};

export default AddMember;
