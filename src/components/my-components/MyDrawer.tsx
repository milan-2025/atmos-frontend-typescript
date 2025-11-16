import {
  Sheet,
  
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { IMyDrawerProps } from "./componentsinerfaces";
import { Milestone } from "lucide-react";

const MyDrawer: React.FC<IMyDrawerProps> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        className="bg-[#18222C] border-b border-gray-400 gap-0 md:w-[21vw]  text-gray-100"
        side="left"
        
      >
        <SheetHeader>
          <SheetTitle className="text-gray-200 text-xl font-medium">
            Atmos Logo
          </SheetTitle>
          <SheetDescription className="text-gray-200">@2025</SheetDescription>
        </SheetHeader>
        <div className="flex p-0 h-full w-full text-gray-300  flex-col">
            <div className="flex w-10/12 flex-row cursor-pointer hover:bg-blue-400/10 hover:rounded-lg hover:text-blue-400 py-1.5 ml-4 pr-5 pl-3"><Milestone className="pr-1 w-8 h-8 align-top justify-self-start"/> <div className="flex items-center">Register Company</div></div>
          
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MyDrawer;
