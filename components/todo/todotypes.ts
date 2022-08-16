import { Dispatch, SetStateAction } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { FormDataType, TodoType } from "../../shared/sharedtypes";

export interface TodoDeleteModalProps {
    handleOnCancel: () => void;
    todo: TodoType;
}

export interface TodoCardProps {
    todo: TodoType;
}

export interface AddTodoType {
    projectId: number;
    name: string;
}

export interface TodoEditingIconsProps {
    handleOnCancel: () => void;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    handleSubmit: UseFormHandleSubmit<FormDataType>;
    todo: TodoType;
}
export interface TodoColumnProps {
    title: string;
}

export interface TodoSectionProps {
    isOpen: boolean;
}

export interface TodoColumnTitleProps {
    title: string;
}
