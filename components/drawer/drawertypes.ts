import { Dispatch, SetStateAction } from "react";
export interface DrawerProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}
