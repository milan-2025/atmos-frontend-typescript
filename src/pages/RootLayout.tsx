import LoadingScreen from "@/components/my-components/LoadingScreen";
import Navbar from "@/components/my-components/Navbar";
import { Outlet, useNavigation } from "react-router";
import { Toaster } from "sonner";

const RootLayout: React.FC = () => {
  const navigation = useNavigation();
  let isLoading = navigation.state == "loading";
  return (
    <>
      {isLoading && <LoadingScreen />}
      <header>
        <Navbar />
        <Toaster />
      </header>
      <main className="mt-4">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
