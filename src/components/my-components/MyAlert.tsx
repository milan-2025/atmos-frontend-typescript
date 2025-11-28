import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import type { IMyAlertProps } from "@/interfaces/componentsinerfaces"
import { useNavigate } from "react-router"

export const MyAlert: React.FC<IMyAlertProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate()
  const handleContinue = () => {
    // Perform the permanent action here (e.g., API call to delete account)
    console.log("Account deletion initiated...")

    navigate("/qa-meeting")

    // Close the dialog after the action or if the user clicks continue
    setIsOpen(false)
  }

  // 6. Function to handle the cancel action (and close the dialog)
  const handleCancel = () => {
    // You can perform cancellation-specific logic here if needed
    console.log("Action cancelled.")

    // Close the dialog
    setIsOpen(false)
  }

  return (
    <>
      {/* 7. Button that triggers the dialog programmatically */}
      {/* <Button variant="outline" onClick={handleOpenDialog}>
        Delete Account
      </Button> */}

      {/* 8. Pass the state to the AlertDialog component */}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        {/* 9. Remove <AlertDialogTrigger> since we control the state externally.
             The onOpenChange prop handles closing via escape key or clicking outside.
        */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Meeting Started!!!</AlertDialogTitle>
            <AlertDialogDescription>
              Your Manager have started a live QA Meeting join now.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* 10. Use the handler to close the dialog on Cancel */}
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>

            {/* 11. Use the handler to perform the action and close on Continue */}
            <AlertDialogAction onClick={handleContinue}>
              Join Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
