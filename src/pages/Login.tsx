import LoadingScreen from "@/components/my-components/LoadingScreen"
import MyInput from "@/components/my-components/MyInput"
import { Button } from "@/components/ui/button"
import { isNotEmpty, isValidEmail } from "@/helpers/validation"
import useAppDispatch from "@/hooks/useAppDispatch"
import useInputValidation from "@/hooks/useInputValidation"
import { loginHandler } from "@/http/apiHandlers"
import { handleLogin } from "@/store/authSlice"
import { useMutation } from "@tanstack/react-query"
import { Eye, EyeOff, LogIn, UserCircle2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"

const Login: React.FC = () => {
  const {
    value: email,
    didEdit: emailDidEdit,
    handleOnBlur: handleEmailBlur,
    handleOnChange: handleEmailChange,
    error: EmailError,
    handleFocus: emailFocus,
  } = useInputValidation("", () => {
    if (isNotEmpty(email).chk) {
      return isValidEmail(email)
    } else {
      return isNotEmpty(email)
    }
  })

  const {
    value: password,
    didEdit: passwordDidEdit,
    handleOnBlur: handlePasswordBlur,
    handleOnChange: handlePasswordChange,
    error: passwordError,
    handleFocus: passwordFocus,
  } = useInputValidation("", () => {
    return isNotEmpty(password)
  })

  const [showPassword, setShowPassword] = useState(false)
  const [formisDisabled, setFormisDisabled] = useState(false)
  const [serverFieldError, setServerFieldErrors] = useState<any>({})

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: loginHandler,
    retry: false,
    onSuccess: (data) => {
      console.log("data after sign up", data)
      if (data.flow == "NORMAL_LOGIN") {
        dispatch(
          handleLogin({
            token: data.token,
            expirationTime: new Date().getTime() + 9 * 60 * 60 * 1000,
            name: data.name,
            teamId: data.teamId,
          })
        )
        toast.success("Logged In", {
          classNames: {
            toast: "!bg-green-500 !text-gray-100 !border-0",
          },
          position: "top-right",
        })
        navigate("/employee-dashboard", { replace: true })
      }
      if (data.flow == "SET_PASSWORD") {
        localStorage.setItem("specialToken", data.token)
        localStorage.setItem(
          "specialTokenExpiry",
          (new Date().getTime() + 15 * 60 * 1000).toString()
        )
        navigate("/set-password", { replace: true })
      }
    },
  })

  const toggleShowPassword = () => {
    setShowPassword((olsState) => !olsState)
  }

  const loginBlur = () => {
    handleEmailBlur()
    handlePasswordBlur()
  }

  const loginClicked = () => {
    if (formisDisabled) {
      return
    }

    if (
      (EmailError && !EmailError.chk) ||
      (passwordError && !passwordError.chk)
    ) {
      return
    }

    console.log("now we can login", { email, password })
    mutate({ email: email.trim(), password: password.trim() })
  }

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

  useEffect(() => {
    if (emailDidEdit && passwordDidEdit) {
      setFormisDisabled(false)
    } else {
      setFormisDisabled(true)
    }
  }, [emailDidEdit, passwordDidEdit])
  return (
    <>
      {isPending && <LoadingScreen />}
      <div
        id="login-outer-container"
        className="flex flex-col w-full items-center"
      >
        <div
          id="inner-container"
          className="flex flex-col w-10/12 items-center"
        >
          <div
            id="login-container"
            className="flex flex-col items-center bg-[#141E27] border border-gray-500 mt-8 p-7 shadow-md shadow-gray-400 rounded-xl w-full md:w-4/12"
          >
            <UserCircle2 className="size-18 stroke-1 text-blue-300" />
            <div className="text-2xl text-gray-100 font-bold">Welcome Back</div>
            <div className="text-sm text-gray-300">
              Sign in to your account to continue.
            </div>
            <div className="w-full mt-5">
              <div className="w-full">
                <MyInput
                  id="email"
                  title="Email"
                  placeholder="henry.b@gmail.com"
                  value={email}
                  onFocus={emailFocus}
                  onChange={(e) => {
                    handleEmailChange(e)
                    setServerFieldErrors((oldState: any) => {
                      let newState = { ...oldState }
                      if (newState.hasOwnProperty("email")) {
                        delete newState.email
                      }
                      return newState
                    })
                  }}
                  onBlur={handleEmailBlur}
                  autoComplete="new-email"
                />
              </div>
              {emailDidEdit && EmailError && !EmailError.chk && (
                <div className="text-sm pl-1.5 mt-1.5 text-red-400">
                  {EmailError.message}
                </div>
              )}
            </div>
            {serverFieldError.hasOwnProperty("email") && (
              <div className="text-sm text-left w-full pl-1.5 mt-1.5 text-red-400">
                {serverFieldError.email}
              </div>
            )}

            <div className="w-full relative mt-3">
              <MyInput
                id="password"
                title="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  handlePasswordChange(e)
                  setServerFieldErrors((oldState: any) => {
                    let newState = { ...oldState }
                    if (newState.hasOwnProperty("password")) {
                      delete newState.password
                    }
                    return newState
                  })
                }}
                onFocus={passwordFocus}
                onBlur={handlePasswordBlur}
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
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
            {passwordDidEdit && passwordError && !passwordError.chk && (
              <div className="text-sm text-left w-full pl-1.5 mt-1.5 text-red-400">
                {passwordError.message}
              </div>
            )}
            {serverFieldError.hasOwnProperty("password") && (
              <div className="text-sm  text-left w-full pl-1.5 mt-1.5 text-red-400">
                {serverFieldError.password}
              </div>
            )}
            <Button
              onClick={() => {
                loginBlur()
                loginClicked()
              }}
              // disabled={formisDisabled}
              className="bg-blue-400 rounded-3xl p-4 hover:bg-blue-400/75 text-white w-full cursor-pointer mt-5"
            >
              Login
              <LogIn />
            </Button>
            <div className="text-sm text-gray-300 mt-4">
              New to Atmos?{" "}
              <Link to={"/"} replace={true}>
                <span className="text-blue-400 cursor-pointer">
                  Create an account.
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
