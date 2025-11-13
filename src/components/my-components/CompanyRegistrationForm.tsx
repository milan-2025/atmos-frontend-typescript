import { Button } from "@/components/ui/button"
import MyInput from "./MyInput"
import { Eye, EyeOff } from "lucide-react"
import useInputValidation from "@/hooks/useInputValidation"
import {
  doConfimPasswordMatch,
  isNotEmpty,
  isValidEmail,
  isValidPassword,
} from "@/helpers/validation"
import { useState } from "react"
const CompanyRegistrationForm: React.FC = () => {
  const {
    value: companyName,
    didEdit: companyNameEdit,
    handleOnBlur: handleCompanyBlur,
    handleOnChange: handleCompanyChange,
    handleFocus: companyFocus,
    error: companyError,
  } = useInputValidation("", () => {
    return isNotEmpty(companyName)
  })

  const {
    value: companyLocation,
    didEdit: companyLocationEdit,
    handleOnBlur: handleCompanyLocationBlur,
    handleOnChange: handleCompanyLocationChange,
    handleFocus: companyLocationFocus,
    error: companyLocationError,
  } = useInputValidation("", () => {
    return isNotEmpty(companyLocation)
  })

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
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((oldValue) => !oldValue)
  }
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((oldValue) => !oldValue)
  }
  return (
    <div
      id="setup-form"
      className="flex flex-1 order-2 mt-8 md:mt-0 md:order-1 flex-col"
    >
      <div className="text-2xl text-gray-200 font-medium">
        Create Your Workspace
      </div>
      <div className="text-sm[1em] mt-0.5 text-gray-400">
        Start building a happier, more connected remote team today.
      </div>
      <div id="form" className="mt-4">
        <div>
          <MyInput
            id="company-name"
            title="Company Name"
            placeholder="Enter your company's name."
            value={companyName}
            onBlur={handleCompanyBlur}
            onChange={handleCompanyChange}
            onFocus={companyFocus}
          />
        </div>
        {companyNameEdit && companyError && !companyError.chk && (
          <div className="text-sm pl-1.5 mt-1.5 text-red-400">
            {companyError.message}
          </div>
        )}

        <div className="mt-3">
          <MyInput
            id="location"
            title="Company's Location"
            placeholder="Eg. city, state, country"
            value={companyLocation}
            onBlur={handleCompanyLocationBlur}
            onChange={handleCompanyLocationChange}
            onFocus={companyLocationFocus}
          />
        </div>
        {companyLocationEdit &&
          companyLocationError &&
          !companyLocationError.chk && (
            <div className="text-sm pl-1.5 mt-1.5 text-red-400">
              {companyLocationError.message}
            </div>
          )}

        <div className="mt-3">
          <MyInput
            id="email"
            title="Your Email"
            placeholder="Eg. henry.b@delta.com"
            helperText="This email will be associated to admin account."
            value={email}
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
            onFocus={emailFocus}
          />
        </div>
        {emailDidEdit && EmailError && !EmailError.chk && (
          <div className="text-sm pl-1.5 mt-1.5 text-red-400">
            {EmailError.message}
          </div>
        )}
        <div className="mt-3 relative">
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
        <div className="mt-5">
          <Button className="bg-blue-400/80 hover:bg-[#4A90E2] cursor-pointer w-full">
            Create Admin Account
          </Button>
        </div>
        <div className="text-sm[1em] mt-1.5 text-gray-400 text-center">
          Already have an account ?{" "}
          <span className="cursor-pointer text-blue-400/80">Log In</span>
        </div>
      </div>
    </div>
  )
}

export default CompanyRegistrationForm
