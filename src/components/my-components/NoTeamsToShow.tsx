import { useState } from "react";
import CreateTeamNModal from "./CreateTeamModal";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const NoTeamsToShow: React.FC = () => {
  const [openCreateTeamModal, setOpenCreateTeamModal] = useState(false);
  const handleOpenCreateTeamModal = () => {
    setOpenCreateTeamModal(true);
  };
  const closeCreateTeamModal = () => {
    setOpenCreateTeamModal(false);
  };

  return (
    <>
      <div
        id="no-teams-to-show"
        className="flex flex-col items-center justify-center mt-6 space-y-3"
      >
        <div className="text-xl rounded-lg  border shadow border-gray-200 bg-[#141E27] p-2 text-gray-200 font-medium">
          No teams created yet
        </div>

        <Button
          onClick={handleOpenCreateTeamModal}
          className="bg-blue-400  hover:bg-blue-400/70 text-white! text-lg font-bold!"
        >
          <Plus color="white" className="inline size-5 font-bold" />
          Create New Team
        </Button>
      </div>
      <CreateTeamNModal
        isOpen={openCreateTeamModal}
        setIsOpen={setOpenCreateTeamModal}
        handleClose={closeCreateTeamModal}
      />
    </>
  );
};

export default NoTeamsToShow;
