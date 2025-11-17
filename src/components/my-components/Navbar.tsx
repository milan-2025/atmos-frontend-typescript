import { MenuIcon } from "lucide-react";
import MyDrawer from "./MyDrawer";
import { useState } from "react";
// import useAppSelector from "@/hooks/useAppSelector";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleclose = () => setIsOpen(false);

  return (
    <>
      <nav
        id="navbar"
        className="flex pl-3 flex-row w-full py-3 border-b border-gray-400"
      >
        <div className="flex">
          <MenuIcon
            onClick={() => {
              handleOpen();
            }}
            color="#99a1af"
          />
        </div>
        <div className="flex flex-row w-full justify-center">
          <div className="flex w-10/12 ml-[-3.5em] text-gray-200 font-medium">
            Atmos-Logo-test
          </div>
        </div>
      </nav>
      <MyDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleclose={handleclose}
      />
    </>
  );
};

export default Navbar;
