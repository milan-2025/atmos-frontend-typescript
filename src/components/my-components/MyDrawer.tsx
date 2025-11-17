import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { IMyDrawerProps } from "./componentsinerfaces";
import { LogIn, LogOut, Milestone, User2 } from "lucide-react";
import { Button } from "../ui/button";
import useAppSelector from "@/hooks/useAppSelector";

const MyDrawer: React.FC<IMyDrawerProps> = ({ isOpen, setIsOpen }) => {
  const auth = useAppSelector((state) => state.auth);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        className="bg-[#18222C] border-b border-gray-400 gap-0 md:w-[21vw] text-gray-100"
        side="left"
      >
        <SheetHeader>
          <SheetTitle className="text-gray-200 text-xl  font-medium">
            Atmos Logo
          </SheetTitle>
          <SheetDescription className="text-gray-200">@2025</SheetDescription>
        </SheetHeader>
        <div className="flex p-0 h-full w-full text-gray-300 text-sm  flex-col">
          {!auth.token && (
            <>
              <div className="flex w-10/12 flex-row font-bold cursor-pointer hover:bg-blue-400/10 hover:rounded-lg hover:text-blue-400 py-1.5 ml-4 pr-5 pl-3">
                <Milestone className="pr-1 w-8 h-8 align-top justify-self-start" />{" "}
                <div className="flex items-center">Register Company</div>
              </div>

              <div className="flex w-10/12 flex-row font-bold cursor-pointer hover:bg-blue-400/10 hover:rounded-lg hover:text-blue-400 py-1.5 ml-4 pr-5 pl-3">
                <LogIn className="pr-1 w-8 h-8 align-top justify-self-start" />{" "}
                <div className="flex items-center">Login</div>
              </div>
            </>
          )}

          {auth.token && (
            <>
              <div className="flex w-10/12 flex-row font-bold cursor-pointer hover:bg-blue-400/10 hover:rounded-lg hover:text-blue-400 py-1.5 ml-4 pr-5 pl-3">
                <User2 className="pr-1 w-8 h-8 align-top justify-self-start" />{" "}
                <div className="flex items-center">Hello Milan</div>
              </div>

              <div className="flex w-10/12 ml-4 mt-4">
                <Button className="bg-blue-400 focus-visible:ring-0 hover:bg-blue-400/70 w-full cursor-pointer">
                  <LogOut className="w-8 h-8" />
                  Logout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MyDrawer;
