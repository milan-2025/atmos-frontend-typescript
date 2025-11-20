import { useQuery } from "@tanstack/react-query";
import NoTeamsToShow from "./NoTeamsToShow";
import type { IGetTeamsParams, ITeam } from "./componentsinerfaces";
import { getTeamsHandler } from "@/http/apiHandlers";
import { toast } from "sonner";
import LoadingScreen from "./LoadingScreen";
import useAppSelector from "@/hooks/useAppSelector";
import {
  Table,
  TableBody,
  //   TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useState } from "react";

const TeamsTable: React.FC = () => {
  let token = useAppSelector((state) => state.auth.token);

  const [page, setPage] = useState(1);
  let qParams: IGetTeamsParams = {
    page: page,
    limit: 5,
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["teams", qParams, token],
    queryFn: getTeamsHandler,
  });

  if (isError) {
    console.log("error", error.message);
    toast.error("Some error occurred", {
      classNames: {
        toast: "!bg-red-400 !text-gray-100 !border-0",
      },
      position: "top-right",
    });
  }

  if (data) {
    console.log("data after retrivel:-", data);
  }

  const getManagerName = (team: ITeam) => {
    if (team.hasOwnProperty("managerId")) {
      return team.managerId.fullName;
    } else {
      return "Un assigned";
    }
  };

  const handlePrevious = () => {
    if (page == 1) return;
    setPage((oldState) => oldState - 1);
  };

  const handleNext = () => {
    if (page == data?.noOfPages) return;
    setPage((oldState) => oldState + 1);
  };

  const calculateLowerIndex = () => {
    let lowerIndex = (page - 1) * 5 + 1;
    return lowerIndex;
  };

  const calculateUpperIndex = () => {
    let limit = 5;
    let higherIndex = limit * page;
    if (page == data?.noOfPages) {
      higherIndex = data.totalTeams - limit * (page - 1);
    }
    return higherIndex;
  };
  return (
    <>
      {isLoading && <LoadingScreen />}
      <div
        id="teams-table-container"
        className="flex flex-col w-full items-center"
      >
        {data?.teams.length == 0 || (!data && <NoTeamsToShow />)}

        {data && data.teams.length > 0 && (
          <div className="border rounded-xl overflow-hidden w-full mt-7  shadow-gray-200 shadow-md">
            <Table>
              <TableHeader className="bg-blue-400 hover:bg-blue-400/70!">
                <TableRow>
                  <TableHead className="text-gray-100 p-4">Team Name</TableHead>
                  <TableHead className="text-gray-100">Team Manager</TableHead>
                  <TableHead className="text-gray-100">No of Members</TableHead>
                  <TableHead className="text-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.teams.map((team) => (
                  <TableRow className="hover:bg-blue-400/20" key={team._id}>
                    <TableCell className="text-gray-200 p-4 font-bold">
                      {team.teamName}
                    </TableCell>
                    <TableCell className="text-gray-200 p-4">
                      {getManagerName(team)}
                    </TableCell>
                    <TableCell className="text-gray-200 p-4">
                      {team.size}
                    </TableCell>
                    <TableCell className="text-gray-200 p-4">{`will be added later`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="bg-blue-400/20">
                <TableRow>
                  <TableCell className="text-gray-200 p-4">
                    Showing {calculateLowerIndex()}-{calculateUpperIndex()} of
                    total {data.totalTeams} teams
                  </TableCell>
                  <TableCell colSpan={3} className="p-4">
                    <div className="flex flex-row justify-end items-center space-x-3">
                      <Button
                        disabled={page == 1}
                        onClick={handlePrevious}
                        className="bg-blend-darken hover:bg-black"
                      >
                        <ArrowBigLeft /> Previous
                      </Button>
                      <Button
                        disabled={page == data.noOfPages}
                        onClick={handleNext}
                        className="bg-emerald-400 hover:bg-emerald-400/70"
                      >
                        Next <ArrowBigRight />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default TeamsTable;
