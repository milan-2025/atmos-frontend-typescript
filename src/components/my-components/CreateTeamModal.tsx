import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ICreateTeamModalProps } from "./componentsinerfaces";
import MyInput from "./MyInput";
import MyTextarea from "./MyTextarea";
import { Button } from "../ui/button";
import useInputValidation from "@/hooks/useInputValidation";
import { isNotEmpty } from "@/helpers/validation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createTeamHandler, queryClient } from "@/http/apiHandlers";
import { toast } from "sonner";
import LoadingScreen from "./LoadingScreen";

const CreateTeamNModal: React.FC<ICreateTeamModalProps> = ({
  isOpen,
  setIsOpen,
  handleClose,
}) => {
  const {
    value: teamName,
    setValue: setTeamName,
    didEdit: teamNameDidEdit,
    handleFocus: handleTeamNameFocus,
    handleOnBlur: handleTeamNameBlur,
    handleOnChange: handleTeamNameChange,
    error: teamNameError,
  } = useInputValidation("", () => {
    return isNotEmpty(teamName);
  });

  const [teamDescription, setTeamDescription] = useState("");

  const [serverFieldError, setServerFieldErrors] = useState<any>({});
  const [invalidatingQuery, setInvalidatingQuery] = useState(false);
  const { mutate, isError, error, isPending, reset } = useMutation({
    mutationFn: createTeamHandler,
    retry: false,
    onSuccess: (data) => {
      console.log("team created successfully", data);
      setInvalidatingQuery(true);
      queryClient
        .invalidateQueries({
          queryKey: ["teams-members"],
        })
        .then(() => {
          setInvalidatingQuery(false);

          setTeamName("");
          setTeamDescription("");
          setServerFieldErrors({});

          toast.success("Team Created!!", {
            classNames: {
              toast: "!bg-green-500 !text-gray-100 !border-0",
            },
            position: "top-right",
          });
          setIsOpen(false);
        });
      // close the modal
      //   setIsOpen
      //   setIsOpen(false);
    },
  });

  if (isError) {
    console.log("error creating team", error);
    //@ts-ignore
    if (error.info) {
      //@ts-ignore

      setServerFieldErrors(error.info.errors);
      //@ts-ignore
      if (error.info.errors.error) {
        toast.error("Some error occurred", {
          classNames: {
            toast: "!bg-red-400 !text-gray-100 !border-0",
          },
          position: "top-right",
        });
      }
    } else {
      console.log("error during registring company-", error);
      toast.error("some error occurred", {
        classNames: {
          toast: "!bg-red-400 !text-gray-100 !border-0",
        },
        position: "top-right",
      });
    }
    reset();
  }
  const handleCreateTeam = () => {
    handleTeamNameBlur();

    if (teamNameError && !teamNameError.chk) {
      return;
    }

    console.log("can create team now", { teamName, teamDescription });
    mutate({ teamName: teamName.trim(), description: teamDescription.trim() });
  };

  const handleCancel = () => {
    setTeamName("");
    setTeamDescription("");
    setServerFieldErrors({});
    handleClose();
  };
  const handleOpenChange = (newState: boolean) => {
    if (!newState) {
      // handleCancel()
      setTeamName("");
      setTeamDescription("");
      setServerFieldErrors({});
    }
    setIsOpen(newState);
  };

  return (
    <>
      {(isPending || invalidatingQuery) && <LoadingScreen />}
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          onEscapeKeyDown={(e) => {
            e.preventDefault();
          }}
          onPointerDownOutside={(e) => {
            e.preventDefault();
          }}
          className="sm:max-w-[425px] bg-[#141E27] text-gray-100"
        >
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
            <DialogDescription className="text-gray-400">
              Organize Employees into Teams for better management.
            </DialogDescription>
          </DialogHeader>

          {/* The Body (Your form fields, text, etc., go here) */}
          <div className="flex flex-col mt-2">
            {/* Example of content structure */}
            <div className="mb-3">
              <MyInput
                id="Team Name"
                title="Team Name"
                placeholder="eg. Design Team"
                value={teamName}
                onFocus={handleTeamNameFocus}
                onBlur={handleTeamNameBlur}
                onChange={handleTeamNameChange}
              />
              {teamNameDidEdit && teamNameError && !teamNameError.chk && (
                <div className="text-sm pl-1.5 mt-1.5 text-red-400">
                  {teamNameError.message}
                </div>
              )}
              {serverFieldError.hasOwnProperty("teamName") && (
                <div className="text-sm pl-1.5 mt-1.5 text-red-400">
                  {serverFieldError.teamName}
                </div>
              )}
            </div>

            <div>
              <MyTextarea
                title="Team Description (optional)"
                id="team-description"
                placeholder="eg. This Team handles Design related stuff of the project."
                value={teamDescription}
                onChange={(e) => {
                  setTeamDescription(e.target.value);
                }}
                //   helperText="test helper text"
              />
              {serverFieldError.hasOwnProperty("description") && (
                <div className="text-sm pl-1.5 mt-1.5 text-red-400">
                  {serverFieldError.description}
                </div>
              )}
            </div>
          </div>

          {/* The Footer (Action buttons) */}
          <DialogFooter className="mt-2">
            <Button
              onClick={handleCancel}
              disabled={isPending}
              className="bg-red-500 hover:bg-red-500/70 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateTeam}
              disabled={isPending}
              className="bg-green-400 hover:bg-green-400/70 text-black cursor-pointer"
            >
              Create Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTeamNModal;
