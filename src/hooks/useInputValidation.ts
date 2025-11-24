interface IsValid {
  message: string
  chk: boolean
}

import { useEffect, useState } from "react"

// }

const useInputValidation = (initialValue: string, validationFn: any) => {
  const [value, setValue] = useState(initialValue)
  const [didEdit, setDidEdit] = useState(false)
  const [error, setError] = useState<IsValid | null>(null)

  const handleOnBlur = () => {
    setDidEdit(true)
    let result = validationFn()
    setError(result)
  }

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDidEdit(true)
    setValue(e.target.value)
    // let result = validationFn()
    // setError(result)
  }
  const handleFocus = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTimeout(() => {
      const autofilledValue = e.target.value
      if (autofilledValue) {
        setDidEdit(true)
        setValue(autofilledValue)
        // let result = validationFn()
        // setError(result)
      }
    }, 50)
  }

  //   for auto-fill
  useEffect(() => {
    if (value) {
      setDidEdit(true)
      let result = validationFn()
      setError(result)
    }
  }, [value])

  return {
    value,
    didEdit,
    error,
    setValue,
    handleOnBlur,
    handleOnChange,
    setDidEdit,
    handleFocus,
  }
}

export default useInputValidation
