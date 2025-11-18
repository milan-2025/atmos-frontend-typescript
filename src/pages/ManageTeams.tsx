import CreateTeamNModal from "@/components/my-components/CreateTeamModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

const ManageTeams: React.FC = () => {
  const [openCreateTeamModal, setOpenCreateTeamModal] = useState(false);
  const handleOpenCreateTeamModal = () => {
    setOpenCreateTeamModal(true);
  };
  return (
    <>
      <div
        id="manage-teams-outer-container"
        className="flex flex-col w-full items-center"
      >
        <div
          id="manage-teams-inner-container"
          className="flex w-10/12 flex-col"
        >
          <div className="flex flex-col md:flex-row w-full md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-100">Manage Teams</h1>
              <div className="text-sm[1em] mt-1 text-gray-400">
                Create new teams and manage existing ones, for your
                organization.
              </div>
            </div>

            <div className="md:ml-auto">
              <Button className="bg-blue-400  hover:bg-blue-400/70 text-white! text-lg font-bold!">
                <Plus color="white" className="inline size-5 font-bold" />
                Create New Team
              </Button>
            </div>
          </div>
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
        </div>
      </div>
      <CreateTeamNModal
        isOpen={openCreateTeamModal}
        setIsOpen={setOpenCreateTeamModal}
      />
    </>
  );
};

export default ManageTeams;
