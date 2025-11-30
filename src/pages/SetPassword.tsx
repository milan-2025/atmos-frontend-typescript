import LoadingScreen from "@/components/my-components/LoadingScreen"
import MyInput from "@/components/my-components/MyInput"
import { Button } from "@/components/ui/button"
import {
  doConfimPasswordMatch,
  isNotEmpty,
  isValidPassword,
} from "@/helpers/validation"
import useAppDispatch from "@/hooks/useAppDispatch"
import useInputValidation from "@/hooks/useInputValidation"
import { setPasswordHandler } from "@/http/apiHandlers"
import { handleLogin } from "@/store/authSlice"
import { useMutation } from "@tanstack/react-query"
import { Eye, EyeOff, Lock, LogIn } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"

const SetPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [serverFieldError, setServerFieldErrors] = useState<any>({})

  const [formIsDisabled, setFormIsDisabled] = useState(true)

  const toggleShowPassword = () => {
    setShowPassword((oldValue) => !oldValue)
  }
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((oldValue) => !oldValue)
  }

  const {
    value: password,
    didEdit: passwordEdit,
    handleOnBlur: handlepasswordBlur,
    handleOnChange: handlepasswordChange,
    error: passwordError,
    handleFocus: passwordFocus,
  } = useInputValidation("", () => {
    if (isNotEmpty(password).chk) {
      return isValidPassword(password)
    } else {
      return isNotEmpty(password)
    }
  })

  const {
    value: confirmPassword,
    didEdit: confirmPasswordEdit,
    handleOnBlur: handleconfirmPasswordBlur,
    handleOnChange: handleconfirmPasswordChange,
    error: confirmPasswordError,
    handleFocus: confirmPasswordFocus,
  } = useInputValidation("", () => {
    if (isNotEmpty(confirmPassword).chk) {
      return doConfimPasswordMatch(confirmPassword, password)
    } else {
      return isNotEmpty(confirmPassword)
    }
  })

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: setPasswordHandler,
    retry: false,
    onSuccess: (data) => {
      dispatch(
        handleLogin({
          token: data.token,
          expirationTime: new Date().getTime() + 9 * 60 * 60 * 1000,
          name: data.name,
          email: data.email,
          teamId: data.teamId,
          role: data.role,
        })
      )
      toast.success("Logged In", {
        classNames: {
          toast: "!bg-green-500 !text-gray-100 !border-0",
        },
        position: "top-right",
      })
      navigate("/employee-dashboard", { replace: true })
    },
  })

  if (isError) {
    // console.log('Error in registring company-',error)
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
        navigate("/login", { replace: true })
      }
    } else {
      console.log("error during setting password-", error)
      toast.error("some error occurred", {
        classNames: {
          toast: "!bg-red-400 !text-gray-100 !border-0",
        },
        position: "top-right",
      })
      navigate("/login", { replace: true })
    }
    reset()
  }

  const handleSignUpClicked = () => {
    handlepasswordBlur()
    handleconfirmPasswordBlur()

    if (formIsDisabled) {
      return
    }
    if (
      (passwordError && !passwordError.chk) ||
      (confirmPasswordError && !confirmPasswordError.chk)
    ) {
      return
    }

    console.log("now can setup password---", {
      password: password.trim(),
    })

    mutate({
      password: password.trim(),
      specialToken: localStorage.getItem("specialToken") as string,
    })
  }

  useEffect(() => {
    if (passwordEdit && confirmPasswordEdit) {
      setFormIsDisabled(false)
    } else {
      setFormIsDisabled(true)
    }
  }, [passwordEdit, confirmPasswordEdit])
  return (
    <>
      {isPending && <LoadingScreen />}
      <div
        id="set-password-outer-container"
        className="flex flex-col w-full items-center"
      >
        <div
          id="set-password-inner-container"
          className="flex flex-col w-10/12 items-center"
        >
          <div
            id="card-container"
            className="flex flex-col items-center bg-[#141E27] border border-gray-500 mt-8 p-7 shadow-md shadow-gray-400 rounded-xl w-full md:w-4/12"
          >
            <Lock className="size-18 stroke-1 text-blue-300" />
            <div className="text-2xl text-gray-100 font-bold">Set Password</div>
            <div className="text-sm text-gray-300">
              Set a secure password for your account to continue.
            </div>
            <div className="w-full mt-5">
              <div className="relative">
                <MyInput
                  id="password"
                  title="Password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={handlepasswordChange}
                  onBlur={handlepasswordBlur}
                  type={showPassword ? "text" : "password"}
                  onFocus={passwordFocus}
                />
                {showPassword ? (
                  <Eye
                    color="#d1d5dc"
                    className="absolute right-3 top-[72%] transform -translate-y-1/2 
      h-6 w-6 cursor-pointer"
                    onClick={toggleShowPassword}
                  />
                ) : (
                  <EyeOff
                    color="#d1d5dc"
                    className="absolute right-3 top-[72%] transform -translate-y-1/2 
      h-6 w-6 cursor-pointer"
                    onClick={toggleShowPassword}
                  />
                )}
              </div>
              {passwordEdit && passwordError && !passwordError.chk && (
                <div className="text-sm pl-1.5 mt-1.5 text-red-400">
                  {passwordError.message}
                </div>
              )}
              {serverFieldError.hasOwnProperty("password") && (
                <div className="text-sm pl-1.5 mt-1.5 text-red-400">
                  {serverFieldError.password}
                </div>
              )}

              <div className="mt-3 relative">
                <MyInput
                  id="confirmPassword"
                  title="Confirm Password"
                  placeholder="Repeat your password"
                  onChange={handleconfirmPasswordChange}
                  onBlur={handleconfirmPasswordBlur}
                  onFocus={confirmPasswordFocus}
                  value={confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                />
                {showConfirmPassword ? (
                  <Eye
                    color="#d1d5dc"
                    className="absolute right-3 top-[72%] transform -translate-y-1/2 
      h-6 w-6 cursor-pointer"
                    onClick={toggleShowConfirmPassword}
                  />
                ) : (
                  <EyeOff
                    color="#d1d5dc"
                    className="absolute right-3 top-[72%] transform -translate-y-1/2 
      h-6 w-6 cursor-pointer"
                    onClick={toggleShowConfirmPassword}
                  />
                )}
              </div>
              {confirmPasswordEdit &&
                confirmPasswordError &&
                !confirmPasswordError.chk && (
                  <div className="text-sm pl-1.5 mt-1.5 text-red-400">
                    {confirmPasswordError.message}
                  </div>
                )}

              <Button
                onClick={() => {
                  handleSignUpClicked()
                }}
                disabled={isPending}
                className="bg-blue-400 rounded-3xl p-4 hover:bg-blue-400/75 text-white w-full cursor-pointer mt-5"
              >
                Set Password & Login
                <LogIn />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SetPassword
