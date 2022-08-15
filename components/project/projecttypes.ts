import { Dispatch, SetStateAction } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { FormDataType } from "../../shared/sharedtypes";

export interface ProjectCardProps {
    name: string;
}

export interface UpdateProjectType {
    id: number;
    name: string;
}

export interface ProjectDeleteModalProps {
    handleOnCancel: () => void;
}

export interface ProjectEditingIconsProps {
    handleOnCancel: () => void;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    handleSubmit: UseFormHandleSubmit<FormDataType>;
}
