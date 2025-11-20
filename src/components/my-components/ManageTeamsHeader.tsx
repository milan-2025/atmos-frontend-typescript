import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import CreateTeamNModal from "./CreateTeamModal";

const ManageTeamsHeader: React.FC = () => {
  const [openCreateTeamModal, setOpenCreateTeamModal] = useState(false);
  const handleOpenCreateTeamModal = () => {
    setOpenCreateTeamModal(true);
  };
  const closeCreateTeamModal = () => {
    setOpenCreateTeamModal(false);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row w-full md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Manage Teams</h1>
          <div className="text-sm[1em] mt-1 text-gray-400">
            Create new teams and manage existing ones, for your organization.
          </div>
        </div>

        <div className="md:ml-auto">
          <Button
            onClick={handleOpenCreateTeamModal}
            className="bg-blue-400  hover:bg-blue-400/70 text-white! text-lg font-bold!"
          >
            <Plus color="white" className="inline size-5 font-bold" />
            Create New Team
          </Button>
        </div>
      </div>
      <CreateTeamNModal
        isOpen={openCreateTeamModal}
        setIsOpen={setOpenCreateTeamModal}
        handleClose={closeCreateTeamModal}
      />
    </>
  );
};

export default ManageTeamsHeader;
