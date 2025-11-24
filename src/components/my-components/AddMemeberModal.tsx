import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { IAddMemberModalProps } from "../../interfaces/componentsinerfaces"
import MyInput from "./MyInput"
import useInputValidation from "@/hooks/useInputValidation"
import { isNotEmpty, isValidEmail } from "@/helpers/validation"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { addMemberHandler, queryClient } from "@/http/apiHandlers"
import { toast } from "sonner"
import LoadingScreen from "./LoadingScreen"

const AddMemberModal: React.FC<IAddMemberModalProps> = ({
  isOpen,
  setIsOpen,
  handleClose,
  team,
}) => {
  const {
    value: fullName,
    setValue: setFullName,
    setDidEdit: seNameDidEdit,
    didEdit: nameDidEdit,
    error: nameHasError,
    handleOnBlur: handleNameBlur,
    handleFocus: handleNameFocus,
    handleOnChange: handleNameChange,
  } = useInputValidation("", () => {
    return isNotEmpty(fullName)
  })

  const {
    value: email,
    setValue: setEmail,
    setDidEdit: setEmailDidEdit,
    didEdit: emailDidEdit,
    error: emailHasError,
    handleOnBlur: handleEmailBlur,
    handleFocus: handleEmailFocus,
    handleOnChange: handleEmailChange,
  } = useInputValidation("", () => {
    if (isNotEmpty(email).chk) {
      return isValidEmail(email)
    } else {
      return isNotEmpty(email)
    }
  })

  const handleOnChange = (newState: boolean) => {
    if (!newState) {
      // handleCancel()
      //   setFullName("");
      //   setEmail("");
      //   setServerFieldErrors({});
      handleCancel()
    }
    setIsOpen(newState)
  }

  const [queryInvalidating, setQueryInvalidating] = useState(false)

  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: addMemberHandler,
    onSuccess: (data) => {
      console.log("data after add memeber", data)
      setQueryInvalidating(true)
      queryClient
        .invalidateQueries({
          queryKey: ["teams-members"],
        })
        .then(() => {
          setQueryInvalidating(false)

          toast.success("Member Added", {
            classNames: {
              toast: "!bg-green-500 !text-gray-100 !border-0",
            },
            position: "top-right",
          })
          handleCancel()
        })
    },
  })

  const handleAdd = () => {
    handleNameBlur()
    handleEmailBlur()

    if (formIsDisabled) {
      return
    }

    if (
      (nameHasError && !nameHasError.chk) ||
      (emailHasError && !emailHasError.chk)
    ) {
      return
    }

    console.log("now can add member", {
      fullName: fullName.trim(),
      email: email.trim(),
    })

    mutate({
      fullName: fullName.trim(),
      email: email.trim(),
      teamId: team._id,
      teamName: team.teamName,
    })
  }

  const [serverFieldError, setServerFieldErrors] = useState<any>({})
  if (isError) {
    //@ts-ignore
    if (error.info) {
      //@ts-ignore

      setServerFieldErrors(error.info.errors)
      //@ts-ignore
      if (error.info.errors.error) {
        toast.error("Some error occurred", {
          classNames: {
            toast: "!bg-red-400 !text-gray-100 !border-0",
          },
          position: "top-right",
        })
      }
    } else {
      console.log("error during registring company-", error)
      toast.error("some error occurred", {
        classNames: {
          toast: "!bg-red-400 !text-gray-100 !border-0",
        },
        position: "top-right",
      })
    }
    reset()
  }

  const handleCancel = () => {
    setFullName("")
    setEmail("")
    seNameDidEdit(false)
    setEmailDidEdit(false)

    handleClose()
  }

  const [formIsDisabled, setFormIsDisabled] = useState(true)

  useEffect(() => {
    if (nameDidEdit && emailDidEdit) {
      setFormIsDisabled(false)
    } else {
      setFormIsDisabled(true)
    }
  }, [nameDidEdit, emailDidEdit])
  return (
    <>
      {(isPending || queryInvalidating) && <LoadingScreen />}
      <Dialog open={isOpen} onOpenChange={handleOnChange}>
        <DialogContent
          onEscapeKeyDown={(e) => {
            e.preventDefault()
          }}
          onPointerDownOutside={(e) => {
            e.preventDefault()
          }}
          className="sm:max-w-[425px] bg-[#141E27] text-gray-100"
        >
          <DialogHeader>
            <DialogTitle>Add Member</DialogTitle>
            <DialogDescription className="text-gray-400">
              Organize Employees into Teams for better management.
            </DialogDescription>
          </DialogHeader>

          {/* The Body (Your form fields, text, etc., go here) */}
          <div className="flex flex-col mt-2">
            {/* Example of content structure */}
            <div className="mb-3">
              <MyInput
                id="fullName"
                title="Employee Name"
                placeholder="eg. Anil Kumar"
                value={fullName}
                onFocus={handleNameFocus}
                onBlur={handleNameBlur}
                onChange={handleNameChange}
              />
              {nameDidEdit && nameHasError && !nameHasError.chk && (
                <div className="text-sm pl-1.5 mt-1.5 text-red-400">
                  {nameHasError.message}
                </div>
              )}
              {serverFieldError.hasOwnProperty("fullName") && (
                <div className="text-sm pl-1.5 mt-1.5 text-red-400">
                  {serverFieldError.fullName}
                </div>
              )}
            </div>

            <div className="mb-3">
              <MyInput
                id="email"
                title="Employee Email"
                placeholder="eg. anil.k@gmail.com"
                value={email}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
                onChange={handleEmailChange}
              />
              {emailDidEdit && emailHasError && !emailHasError.chk && (
                <div className="text-sm pl-1.5 mt-1.5 text-red-400">
                  {emailHasError.message}
                </div>
              )}
              {serverFieldError.hasOwnProperty("email") && (
                <div className="text-sm pl-1.5 mt-1.5 text-red-400">
                  {serverFieldError.email}
                </div>
              )}
            </div>
          </div>

          {/* The Footer (Action buttons) */}
          <DialogFooter className="mt-2">
            <Button
              onClick={handleCancel}
              //   disabled={isPending}
              className="bg-red-500 hover:bg-red-500/70 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              //   disabled={isPending}
              className="bg-green-400 hover:bg-green-400/70 text-black cursor-pointer"
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddMemberModal
