import { SendHorizonal, X } from "lucide-react"
import { Button } from "../ui/button"
import MyInput from "./MyInput"
import MyRadioBarButton from "./MyRadioBarButton"
import MyTextarea from "./MyTextarea"
import useInputValidation from "@/hooks/useInputValidation"
import { isNotEmpty, isValidEmail } from "@/helpers/validation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { getTokenFromLocalStorage } from "@/helpers/authentication"

import LoadingScreen from "./LoadingScreen"

const SendKudoComponent: React.FC = () => {
  const {
    value: to,
    setValue: setTo,
    setDidEdit: setToEdit,
    didEdit: toDidEdit,
    handleFocus: handleToFocus,
    handleOnBlur: handleToBlur,
    handleOnChange: handleToChange,
    error: toError,
  } = useInputValidation("", () => {
    if (isNotEmpty(to).chk) {
      return isValidEmail(to)
    } else {
      return isNotEmpty(to)
    }
  })

  const {
    value: message,
    setValue: setMessage,
    setDidEdit: setMessageEdit,
    didEdit: messageDidEdit,
    handleFocus: handleMessageFocus,
    handleOnBlur: handleMessageBlur,
    handleOnChange: handleMessageChange,
    error: messageError,
  } = useInputValidation("", () => {
    return isNotEmpty(message)
  })

  const [visibility, setSelectedVisibility] = useState("Public")

  const [formISDisabled, setFormIsDisabled] = useState(true)
  const [serverFieldError, setServerFieldErrors] = useState<any>({})
  const [isLoading, setIsloading] = useState(false)
  const handleSendKudo = async () => {
    handleToBlur()
    handleMessageBlur()
    if (formISDisabled) {
      return
    }
    if (
      (toError && !toError.chk) ||
      (messageError && !messageError.chk) ||
      visibility.length == 0
    ) {
      return
    }

    // now can send Kudo

    let token = getTokenFromLocalStorage()
    if (!token) {
      toast.error("Some error occurred", {
        classNames: {
          toast: "!bg-red-400 !text-gray-100 !border-0",
        },
        position: "top-right",
      })
    }
    setIsloading(true)
    const response = await fetch(
      "http://localhost:3000/api/admin/kudos/send-kudo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          to: to.trim(),
          message: message.trim(),
          visibility,
        }),
      }
    )
    setIsloading(false)
    if (!response.ok) {
      let error: any = {}
      error.code = response.status
      error.info = await response.json()
      setServerFieldErrors(error.info.errors)
      //@ts-ignore
      // if (error.info.errors.error) {
      //   toast.error("Some error occurred", {
      //     classNames: {
      //       toast: "!bg-red-400 !text-gray-100 !border-0",
      //     },
      //     position: "top-right",
      //   })
      // } else {
      //   console.log("error during registring company-", error)
      //   toast.error("some error occurred", {
      //     classNames: {
      //       toast: "!bg-red-400 !text-gray-100 !border-0",
      //     },
      //     position: "top-right",
      //   })
      // }
    }

    if (response.ok) {
      let data = await response.json()
      console.log("data from send kudo", data)
      setServerFieldErrors({})
      setTo("")
      setToEdit(false)
      setMessage("")
      setMessageEdit(false)
    }
  }

  // for form validation
  useEffect(() => {
    if (messageDidEdit && toDidEdit) {
      setFormIsDisabled(false)
    } else {
      setFormIsDisabled(true)
    }
  }, [messageDidEdit, toDidEdit])

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="bg-blue-400/20 rounded-xl md:p-6 p-5 flex-col">
        <div className="text-lg  text-gray-200 font-medium">Send a Kudo</div>
        <div className="mt-4 md:pl-2">
          <MyInput
            id="to"
            title="To:"
            placeholder="eg. milansinghdav@gmail.com"
            helperText="Enter email of your collegue."
            value={to}
            onBlur={handleToBlur}
            onChange={handleToChange}
            onFocus={handleToFocus}
          />
        </div>
        {toDidEdit && toError && !toError.chk && (
          <div className="text-sm pl-1.5 mt-1.5 text-red-400">
            {toError.message}
          </div>
        )}
        {serverFieldError.hasOwnProperty("to") && (
          <div className="text-sm pl-1.5 mt-1.5 text-red-400">
            {serverFieldError.to}
          </div>
        )}
        <div className="mt-2 md:pl-2">
          <MyTextarea
            id="message"
            title="Your Message:"
            placeholder="write your message..."
            style={{
              height: "7.5em",
            }}
            value={message}
            onBlur={handleMessageBlur}
            onChange={handleMessageChange}
            onFocus={handleMessageFocus}
          />
        </div>
        {messageDidEdit && messageError && !messageError.chk && (
          <div className="text-sm pl-1.5 mt-1.5 text-red-400">
            {messageError.message}
          </div>
        )}

        <div className="mt-2 md:pl-2">
          <div className="text-gray-300 text-sm[1.3em] pl-0.5 font-medium">
            Visibility:
          </div>

          <div
            id="visibility-radio-group"
            className="flex md:flex-row flex-col w-full gap-4 mt-3"
          >
            <MyRadioBarButton
              title="Public"
              text="Your kudo's identity will be visible to all team members."
              isSelected={visibility == "Public"}
              onClick={() => {
                setSelectedVisibility("Public")
              }}
            />
            <MyRadioBarButton
              title="Private"
              text="Add an anonymous Kudo only you and receiver knows who sent the kudo."
              isSelected={visibility == "Private"}
              onClick={() => {
                setSelectedVisibility("Private")
              }}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-row justify-end gap-2">
          <Button className="bg-red-400 hover:bg-red-400/75 ring-0 focus-visible:ring-0 cursor-pointer text-accent">
            Cancel
            <X />
          </Button>
          <Button
            onClick={handleSendKudo}
            disabled={isLoading}
            className="bg-emerald-400 hover:bg-emerald-400/75 ring-0 focus-visible:ring-0 cursor-pointer text-secondary-foreground"
          >
            {isLoading ? "Sending" : "Send Kudo"} <SendHorizonal />
          </Button>
        </div>
      </div>
    </>
  )
}

export default SendKudoComponent
