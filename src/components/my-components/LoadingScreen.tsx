import { Spinner } from "../ui/spinner";

const LoadingScreen: React.FC = () => {
  return (
    <>
      <div
        id="loading-screen"
        className="w-full top-0 left-0 flex  justify-center items-center fixed z-99999 h-screen bg-[#000000]/60"
      >
        <Spinner className="size-9 text-blue-500" />
      </div>
    </>
  );
};

export default LoadingScreen;
