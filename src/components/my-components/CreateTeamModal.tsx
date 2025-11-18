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

const CreateTeamNModal: React.FC<ICreateTeamModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            />
          </div>

          <div>
            <MyTextarea
              title="Team Description (optional)"
              id="team-description"
              placeholder="eg. This Team handles Design related stuff of the project."
              //   helperText="test helper text"
            />
          </div>
        </div>

        {/* The Footer (Action buttons) */}
        <DialogFooter className="mt-2">
          <Button className="bg-red-500 hover:bg-red-500/70 cursor-pointer">
            Cancel
          </Button>
          <Button className="bg-green-400 hover:bg-green-400/70 text-black cursor-pointer">
            Create Team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamNModal;
