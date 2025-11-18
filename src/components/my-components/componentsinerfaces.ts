export interface IMyDrawerProps {
    isOpen: boolean;
    handleclose: ()=> void;
    setIsOpen: (open: boolean)=> void;
}

export interface IMyNavLinkProps {
    to: string;
    label: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface ICreateTeamModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    handleClose: ()=> void
}

export interface IMyTextareaProps extends React.ComponentProps<"textarea"> {
    title?: string;
    id:string;
    helperText?: string;
}

export interface ICreateTeam {
    teamName: string;
    description?: string;
} 