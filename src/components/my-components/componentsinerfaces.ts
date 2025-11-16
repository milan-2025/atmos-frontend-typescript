export interface IMyDrawerProps {
    isOpen: boolean;
    handleclose: ()=> void;
    setIsOpen: (open: boolean)=> void;
}