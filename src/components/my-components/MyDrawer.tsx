import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { IMyDrawerProps } from "./componentsinerfaces";
import { LogIn, LogOut, Milestone, User2, Users2 } from "lucide-react";
import { Button } from "../ui/button";
import useAppSelector from "@/hooks/useAppSelector";
import MyNavLink from "./MyNavLink";
import useAppDispatch from "@/hooks/useAppDispatch";
import { handleLogout } from "@/store/authSlice";
import { handleLocalStorageLogout } from "@/helpers/authentication";
import { useNavigate } from "react-router";

const MyDrawer: React.FC<IMyDrawerProps> = ({
  isOpen,
  setIsOpen,
  handleclose,
}) => {
  const auth = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const logoutHandler = () => {
    handleLocalStorageLogout();
    dispatch(handleLogout());
    navigate("/login", { replace: true });
  };

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
        <div
          onClick={handleclose}
          className="flex p-0 h-full w-full space-y-1 text-gray-300 text-sm  flex-col"
        >
          {!auth.token && (
            <>
              <MyNavLink to="/" label="Register Company" Icon={Milestone} />
              <MyNavLink to="/login" label="Login" Icon={LogIn} />
            </>
          )}

          {auth.token && (
            <>
              <div className="flex w-10/12 flex-row font-bold cursor-pointer hover:bg-blue-400/10 hover:rounded-lg hover:text-blue-400 py-1.5 ml-4 pr-5 pl-3">
                <User2 className="pr-1 w-8 h-8 align-top justify-self-start" />{" "}
                <div className="flex items-center">Hello Milan</div>
              </div>

              <MyNavLink
                to="/admin/manage-teams"
                label="Manage Teams"
                Icon={Users2}
              />

              <div className="flex w-10/12 ml-4 mt-4">
                <Button
                  onClick={logoutHandler}
                  className="bg-blue-400 focus-visible:ring-0 hover:bg-blue-400/70 w-full cursor-pointer"
                >
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
