import { Dispatch, SetStateAction } from "react";
import { UseFormSetFocus } from "react-hook-form";

export interface AppUserType {
    user: {
        id: number;
        username: string;
        avatar: string;
    };
}

export interface TodoType {
    id: number;
    name: string;
    status: string;
    createdAt: Date;
    projectId: number;
}

export interface ProjectType {
    id: number;
    name: string;
    todo: TodoType[];
}

export interface IdOnlyProps {
    id: number;
}

export interface FormDataType {
    name: string;
}

export interface DropDownMenuProps {
    setFocus: UseFormSetFocus<FormDataType>;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
}
