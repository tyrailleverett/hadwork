import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsCheck, BsX } from "react-icons/bs";
import { toast } from "react-toastify";
import { FormDataType, ProjectType, TodoType } from "../../shared/sharedtypes";
import customAxios from "../../utils/axios";
import { useProjectStore } from "../../zustand/projectstore";
import { TodoEditingIconsProps } from "./todotypes";

const TodoEditingIcons = ({
    handleOnCancel,
    handleSubmit,
    setIsEditing,
    todo
}: TodoEditingIconsProps) => {
    const { activeProject, setActiveProject } = useProjectStore();

    const queryClient = useQueryClient();

    const updateTodo = (todo: TodoType) => {
        return customAxios.put("/todo/updatetodo", { data: todo });
    };

    const handleOnSubmit = (formData: FormDataType) => {
        if (!activeProject?.todo.find((todo) => todo.name === formData.name)) {
            todo.name = formData.name;
            mutate(todo);
        }
    };

    const { mutate } = useMutation(updateTodo, {
        onError: (error) => {
            toast.error(error as string);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries(["projects"]);
            const currentActiveProject = queryClient
                .getQueryData<ProjectType[]>(["projects"])
                ?.find(
                    (project: ProjectType) =>
                        project.name === activeProject?.name
                );
            if (currentActiveProject) {
                setActiveProject(currentActiveProject);
            }
            setIsEditing(false);
        }
    });
    return (
        <div className="flex gap-2">
            <BsX
                className="text-xl text-red-500 hover:cursor-pointer"
                onClick={handleOnCancel}
            />

            <BsCheck
                className="text-xl text-green-500 hover:cursor-pointer"
                onClick={handleSubmit((formData) => handleOnSubmit(formData))}
            />
        </div>
    );
};

export default TodoEditingIcons;
