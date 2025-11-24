import { Textarea } from "../ui/textarea"
import { Label } from "@radix-ui/react-label"
import type { IMyTextareaProps } from "../../interfaces/componentsinerfaces"

const MyTextarea: React.FC<IMyTextareaProps> = ({
  title,
  helperText,
  id,
  ...props
}) => {
  return (
    <>
      <Label
        htmlFor="team-description"
        className="text-gray-300 text-sm[1.3em] pl-0.5 font-medium"
      >
        {title}
      </Label>
      <Textarea
        className=" text-gray-300 w-full rounded-lg mt-2  pb-0.5 px-3 text-[1rem] bg-[#1f2937]/90 transition duration-150 ease-in-out
  focus:outline-none 
    focus:ring-2
    focus:ring-gray-200/50 
    focus:border-gray-400;"
        id={id}
        //   title="Team Description (optional)"
        // rows={80}
        {...props}
      />
      {helperText && (
        <span className="text-gray-400 pl-1.5 mt-1.5 text-sm">
          {helperText}
        </span>
      )}
    </>
  )
}

export default MyTextarea
