// import { useEffect } from "react"

const MyRadioBarButton: React.FC<
  {
    title: string
    text: string
    isSelected: boolean
    //   handleSetValue: ()=>{}
  } & React.ComponentProps<"div">
> = ({ title, text, isSelected, ...props }) => {
  let addedClasses = ""
  if (isSelected) {
    addedClasses = "bg-blue-500/20 border-blue-400 border-2"
  }
  // useEffect
  return (
    <>
      <div
        id="visibility-radio-button"
        className={
          !isSelected
            ? "flex flex-row p-3 items-center flex-1 border rounded-lg cursor-pointer"
            : "flex flex-row p-3 items-center flex-1 border rounded-lg cursor-pointer" +
              " " +
              addedClasses
        }
        {...props}
      >
        <div className="mt-0.5 pr-3">
          <button
            className={
              !isSelected
                ? "border rounded-[100%] w-5 h-5"
                : "border rounded-[100%] w-5 h-5 bg-blue-500"
            }
          >
            {/* <Circle /> */}
          </button>
        </div>
        <div className="grow  flex flex-col">
          <div className="text-gray-200 font-medium">{title}</div>
          <div className="text-sm text-gray-300">{text}</div>
        </div>
      </div>
    </>
  )
}

export default MyRadioBarButton
