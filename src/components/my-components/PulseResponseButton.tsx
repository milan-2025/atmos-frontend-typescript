import type { IPulseResponseButtonProps } from "@/interfaces/componentsinerfaces"
import { Frown, Laugh, Meh } from "lucide-react"

const PulseResponseButton: React.FC<IPulseResponseButtonProps> = ({
  isSelected,
  variant = "default",
  ...props
}) => {
  let buttonBgClass = ""
  let icon = null
  let text = ""
  if (variant == "success") {
    buttonBgClass = "bg-green-500/20"
    icon = <Laugh className="text-green-500" />
    text = "Feeling Good"
  }
  if (variant == "danger") {
    buttonBgClass = "bg-red-500/20"
    icon = <Frown className="text-red-500" />
    text = "Overwhelmed"
  }
  if (variant == "default") {
    buttonBgClass = "bg-blue-500/20"
    icon = <Meh className="text-blue-500" />
    text = "Getting Busy"
  }

  let normalClasses =
    "flex md:flex-col flex-row items-center gap-1 bg-blue-500/5 p-3 rounded-lg cursor-pointer mt-3 md:mt-0"
  let addedClasses = "bg-blue-500/20 border-blue-400 border-2"
  return (
    <>
      <div
        className={
          !isSelected ? normalClasses : normalClasses + " " + addedClasses
        }
        {...props}
      >
        <button
          className={"w-fit p-2 rounded-4xl mr-2 md:mr-0" + " " + buttonBgClass}
        >
          {icon}
        </button>

        <div className="text-sm">{text}</div>
      </div>
    </>
  )
}

export default PulseResponseButton
