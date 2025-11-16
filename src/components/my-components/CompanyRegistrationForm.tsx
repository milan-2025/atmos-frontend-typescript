import { Button } from "@/components/ui/button";
import MyInput from "./MyInput";
import { Eye, EyeOff } from "lucide-react";
import useInputValidation from "@/hooks/useInputValidation";
import {
  doConfimPasswordMatch,
  isNotEmpty,
  isValidEmail,
  isValidPassword,
} from "@/helpers/validation";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerCompanyHandler } from "@/http/apiHandlers";
import type { ICreateCompany } from "@/http/apiHandlerInterfaces";
import { toast } from "sonner";
import useAppDispatch from "@/hooks/useAppDispatch";
import { handleLogin } from "@/store/authSlice";

const CompanyRegistrationForm: React.FC = () => {
  const {
    value: companyName,
    didEdit: companyNameEdit,
    handleOnBlur: handleCompanyBlur,
    handleOnChange: handleCompanyChange,
    handleFocus: companyFocus,
    error: companyError,
  } = useInputValidation("", () => {
    return isNotEmpty(companyName);
  });

  const {
    value: companyLocation,
    didEdit: companyLocationEdit,
    handleOnBlur: handleCompanyLocationBlur,
    handleOnChange: handleCompanyLocationChange,
    handleFocus: companyLocationFocus,
    error: companyLocationError,
  } = useInputValidation("", () => {
    return isNotEmpty(companyLocation);
  });

  const {
    value: fullName,
    didEdit: didFullNameEdit,
    handleOnBlur: handleFullNameBlur,
    handleOnChange: handleFullNameChange,
    handleFocus: fullNameFocus,
    error: fullNameError,
  } = useInputValidation("", () => {
    return isNotEmpty(fullName);
  });

  const {
    value: email,
    didEdit: emailDidEdit,
    handleOnBlur: handleEmailBlur,
    handleOnChange: handleEmailChange,
    error: EmailError,
    handleFocus: emailFocus,
  } = useInputValidation("", () => {
    if (isNotEmpty(email).chk) {
      return isValidEmail(email);
    } else {
      return isNotEmpty(email);
    }
  });

  const {
    value: password,
    didEdit: passwordEdit,
    handleOnBlur: handlepasswordBlur,
    handleOnChange: handlepasswordChange,
    error: passwordError,
    handleFocus: passwordFocus,
  } = useInputValidation("", () => {
    if (isNotEmpty(password).chk) {
      return isValidPassword(password);
    } else {
      return isNotEmpty(password);
    }
  });

  const {
    value: confirmPassword,
    didEdit: confirmPasswordEdit,
    handleOnBlur: handleconfirmPasswordBlur,
    handleOnChange: handleconfirmPasswordChange,
    error: confirmPasswordError,
    handleFocus: confirmPasswordFocus,
  } = useInputValidation("", () => {
    if (isNotEmpty(confirmPassword).chk) {
      return doConfimPasswordMatch(confirmPassword, password);
    } else {
      return isNotEmpty(confirmPassword);
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formisDisabled, setFormisDisabled] = useState(true);
  const [serverFieldError,setServerFieldErrors] = useState<any>({})

  const toggleShowPassword = () => {
    setShowPassword((oldValue) => !oldValue);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((oldValue) => !oldValue);
  };

  // tanstack query code to handle mutation
  const dispatch = useAppDispatch()
  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: registerCompanyHandler,
    retry: false,
    onSuccess: (data) => {
      console.log("after register company:-", data.message);
      dispatch(handleLogin({
        token: data.token,
        expirationTime: new Date().getTime() + 9 * 60 * 60 * 1000, // 9 hours expiration time
      }))
      toast.success("Company Registered", {
        classNames: {
          toast: "!bg-green-500 !text-gray-100 !border-0",
        },
        position: "top-right",
      });
    },
  });

  const handleCreateAccount = () => {
    handleCompanyBlur();
    handleCompanyLocationBlur();
    handleEmailBlur();
    handleconfirmPasswordBlur();
    handlepasswordBlur();
    handleFullNameBlur();
    if (formisDisabled) {
      return;
    }
    if (
      (companyError && !companyError.chk) ||
      (companyLocationError && !companyLocationError.chk) ||
      (EmailError && !EmailError.chk) ||
      (passwordError && !passwordError.chk) ||
      (confirmPasswordError && !confirmPasswordError.chk) ||
      (fullNameError && !fullNameError.chk)
    ) {
      return;
    }

    let dataTosend: ICreateCompany = {
      companyName: companyName.trim(),
      location: companyLocation.trim(),
      fullName: fullName.trim(),
      adminEmail: email.trim(),
      password: password.trim(),
    };
    mutate(dataTosend);
  };

  // handling errors for mutaion
  if (isError) {
    // console.log('Error in registring company-',error)
    //@ts-ignore
    if (error.info) {
      //@ts-ignore

      setServerFieldErrors(error.info.errors);
      //@ts-ignore
      if (error.info.errors.error) {
        toast.error("Some error occurred", {
          classNames: {
            toast: "!bg-red-400 !text-gray-100 !border-0",
          },
          position: "top-right",
        });
      }
    } else {
      console.log("error during registring company-", error);
      toast.error("some error occurred", {
        classNames: {
          toast: "!bg-red-400 !text-gray-100 !border-0",
        },
        position: "top-right",
      });
    }
    reset();
  }
  useEffect(() => {
    if (
      companyNameEdit &&
      companyLocationEdit &&
      emailDidEdit &&
      passwordEdit &&
      confirmPasswordEdit &&
      didFullNameEdit
    ) {
      setFormisDisabled(false);
    } else {
      setFormisDisabled(true);
    }
  }, [
    companyNameEdit,
    companyLocationEdit,
    emailDidEdit,
    passwordEdit,
    confirmPasswordEdit,
    didFullNameEdit,
  ]);
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
        {serverFieldError.hasOwnProperty("companyName") && ( <div className="text-sm pl-1.5 mt-1.5 text-red-400">
            {serverFieldError.companyName}
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
          {serverFieldError.hasOwnProperty("location") && ( <div className="text-sm pl-1.5 mt-1.5 text-red-400">
            {serverFieldError.location}
          </div>
        )}

        <div className="mt-3">
          <MyInput
            id="yourName"
            title="Your Full Name"
            placeholder="Eg. Henry Bann"
            // helperText="This email will be associated to admin account."
            value={fullName}
            onBlur={handleFullNameBlur}
            onChange={handleFullNameChange}
            onFocus={fullNameFocus}
          />
        </div>
        {didFullNameEdit && fullNameError && !fullNameError.chk && (
          <div className="text-sm pl-1.5 mt-1.5 text-red-400">
            {fullNameError.message}
          </div>
        )}

        {serverFieldError.hasOwnProperty("fullName") && ( <div className="text-sm pl-1.5 mt-1.5 text-red-400">
            {serverFieldError.fullName}
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
        {serverFieldError.hasOwnProperty("adminEmail") && ( <div className="text-sm pl-1.5 mt-1.5 text-red-400">
            {serverFieldError.adminEmail}
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
        {serverFieldError.hasOwnProperty("password") && ( <div className="text-sm pl-1.5 mt-1.5 text-red-400">
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
        <div onClick={handleCreateAccount} className="mt-5">
          <Button
            disabled={formisDisabled || isPending}
            className="bg-blue-400/80 hover:bg-[#4A90E2] cursor-pointer w-full"
          >
            {isPending ? "Registring Account" : "Create Admin Account"}
          </Button>
        </div>
        <div className="text-sm[1em] mt-1.5 text-gray-400 text-center">
          Already have an account ?{" "}
          <span className="cursor-pointer text-blue-400/80">Log In</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistrationForm;
