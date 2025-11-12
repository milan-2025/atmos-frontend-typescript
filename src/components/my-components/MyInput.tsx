const MyInput: React.FC<
  {
    title: string
    id: string
    helperText?: string
  } & React.ComponentProps<"input">
> = ({ title, id, helperText, ...props }) => {
  return (
    <>
      <div>
        <label
          htmlFor={id}
          className="text-gray-300 text-sm[1.3em] pl-0.5 font-medium"
        >
          {title}
        </label>
      </div>
      <input
        id={id}
        className="text-gray-300 w-full rounded-4xl mt-2 h-[2.5em] pb-0.5 px-3 text-[1rem] bg-[#1f2937]/90 transition duration-150 ease-in-out
  focus:outline-none 
    focus:ring-2
    focus:ring-gray-200/50 
    focus:border-gray-400;"
        {...props}
      />
      {helperText && (
        <span className="text-gray-400 pl-1.5 mt-2.5 text-sm">
          {helperText}
        </span>
      )}
    </>
  )
}

export default MyInput
