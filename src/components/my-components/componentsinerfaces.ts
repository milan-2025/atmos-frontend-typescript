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