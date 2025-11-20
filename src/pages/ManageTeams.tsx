import ManageTeamsHeader from "@/components/my-components/ManageTeamsHeader";

import TeamsTable from "@/components/my-components/TeamsTable";

const ManageTeams: React.FC = () => {
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
          <ManageTeamsHeader />

          <TeamsTable />
        </div>
      </div>
    </>
  );
};

export default ManageTeams;
