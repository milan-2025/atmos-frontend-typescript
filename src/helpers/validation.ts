interface IsValid {
  message: string
  chk: boolean
}
export function isValidEmail(email: string): IsValid {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return {
    chk: emailRegex.test(email),
    message: "Enter a valid email.",
  }
}

export function isNotEmpty(value: string): IsValid {
  // Convert the value to a string and trim whitespace
  const str = String(value).trim()
  // Return true if the trimmed string has a length greater than 0
  return {
    chk: str.length > 0,
    message: "This field is required.",
  }
}

export function isInteger(value: string): IsValid {
  // Attempt to convert the value to a number
  const num = Number(value)

  // Check if the converted value is an integer and not NaN
  return {
    chk: Number.isInteger(num),
    message: "Enter a valid Phone Number.",
  }
}

export function doConfimPasswordMatch(
  value: string,
  password: string
): IsValid {
  //   console.log(value, password)
  return {
    chk: String(value) == String(password),
    message: "Confirm Password and Password do not match.",
  }
}

export function isValidPassword(value: string): IsValid {
  const passwordRegex = new RegExp(
    "^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"
  )

  return {
    chk: passwordRegex.test(value),
    message:
      "Password must have atleast 1 capital letter 1 number and 1 special symbol and must be atleast 8 characters long.",
  }
}

export function isValidUserName(value: string): IsValid {
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{7,}$/

  return {
    chk: usernameRegex.test(value),
    message:
      "Username must start with a letter, can contain numbers, can only contain _ as special charecter (no spaces) and must be atleast 8 characters long.",
  }
}

/**
 * Converts an ISO date string to a human-readable relative time string.
 * @param isoDateString The ISO 8601 date string (e.g., "2023-10-27T10:00:00.000Z").
 * @returns A string like "5 minutes ago", "3 hours ago", or "2 days ago".
 */
export function timeAgo(isoDateString: string): string {
  // 1. Calculate the difference in milliseconds
  const pastDate = new Date(isoDateString)
  const now = new Date()
  // Use Math.abs() to handle potential clock drift, though for "ago" it should be positive.
  const diffInMilliseconds = now.getTime() - pastDate.getTime()

  // 2. Define the time divisions in milliseconds
  const MS_PER_SECOND = 1000
  const MS_PER_MINUTE = 60 * MS_PER_SECOND
  const MS_PER_HOUR = 60 * MS_PER_MINUTE
  const MS_PER_DAY = 24 * MS_PER_HOUR
  const MS_PER_WEEK = 7 * MS_PER_DAY
  const MS_PER_MONTH = 30 * MS_PER_DAY // Approximate
  const MS_PER_YEAR = 365 * MS_PER_DAY // Approximate

  // 3. Determine the largest relevant unit

  // Convert to absolute value for cleaner calculation and positive units
  const diff = Math.abs(diffInMilliseconds)

  // Array of units from largest to smallest for easy iteration
  const units = [
    { unit: MS_PER_YEAR, label: "year" },
    { unit: MS_PER_MONTH, label: "month" },
    { unit: MS_PER_WEEK, label: "week" },
    { unit: MS_PER_DAY, label: "day" },
    { unit: MS_PER_HOUR, label: "hour" },
    { unit: MS_PER_MINUTE, label: "minute" },
    { unit: MS_PER_SECOND, label: "second" },
  ]

  for (const { unit, label } of units) {
    const value = Math.floor(diff / unit)

    // If the value is 1 or more, this is the largest relevant unit
    if (value >= 1) {
      // Apply pluralization (e.g., "minute" vs "minutes")
      const plural = value > 1 ? "s" : ""
      return `${value} ${label}${plural} ago`
    }
  }

  // Fallback for very small time differences (less than a second)
  return "just now"
}
