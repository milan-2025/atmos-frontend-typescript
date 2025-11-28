import React from "react"

export interface IMyDrawerProps {
  isOpen: boolean
  handleclose: () => void
  setIsOpen: (open: boolean) => void
}

export interface IMyNavLinkProps {
  to: string
  label: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export interface ICreateTeamModalProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  handleClose: () => void
}

export interface IAddMemberModalProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  handleClose: () => void
  team: ITeam
}

export interface IMyTextareaProps extends React.ComponentProps<"textarea"> {
  title?: string
  id: string
  helperText?: string
}

export interface ICreateTeam {
  teamName: string
  description?: string
}

export interface IloginFormProps {
  email: string
  password: string
}

export interface ITeam {
  teamName: string
  size: number
  description: string
  managerId?: any
  _id: string
}

export interface IGetTeamsParams {
  page?: number
  limit?: number
  //   token: string | null;
}

export interface IgetTeamSuccessResponse {
  success: boolean
  teams: ITeam[]
  totalTeams: number
  noOfPages: number
}

export interface IAddMemberButtonProps {
  team: ITeam
}

export interface IBasicModal {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  handleClose: () => void
}

export interface IPulseResponseButtonProps extends React.ComponentProps<"div"> {
  variant: "default" | "success" | "danger"
  isSelected: boolean
  // text: string
}

export interface IMyAlertProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

// export interface ICheckPulseModal extends IBasicModal {

// }
