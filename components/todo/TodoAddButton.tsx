import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaPlusSquare, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { FormDataType, ProjectType } from "../../shared/sharedtypes";
import customAxios from "../../utils/axios";
import { useProjectStore } from "../../zustand/projectstore";
import { AddTodoType } from "./todotypes";

const TodoAddButton = () => {
    const { setActiveProject, activeProject } = useProjectStore();
    const queryClient = useQueryClient();
    const {
        handleSubmit,
        register,
        setFocus,
        resetField,
        formState: { errors }
    } = useForm<FormDataType>();

    const addTodo = ({ name, projectId }: AddTodoType) => {
        return customAxios.post("/todo/addtodo", { name, projectId });
    };

    const onHandleSubmit = (newName: FormDataType) => {
        addTodoMutation.mutate({
            name: newName.name,
            projectId: activeProject!.id
        });

        resetField("name");
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    const onStartEditing = () => {
        resetField("name");
        setFocus("name");
    };

    const addTodoMutation = useMutation(addTodo, {
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
            toast.success("Todo Added 🎉");
        }
    });

    return (
        <>
            <div className="mr-4 dropdown dropdown-left">
                <label
                    data-tip="Add a project first"
                    tabIndex={0}
                    className={` ${
                        !activeProject
                            ? "hover:cursor-not-allowed tooltip tooltip-error"
                            : "hover:cursor-pointer"
                    }`}>
                    <FaPlusSquare
                        className={`${
                            !activeProject ? "opacity-20" : "opacity-100"
                        }`}
                        onClick={onStartEditing}
                    />
                </label>

                <ul
                    tabIndex={0}
                    className={`p-2 border shadow dropdown-content bg-base-100 rounded-box  w-fit ${
                        !activeProject ? "hidden" : "block"
                    }`}>
                    <li>
                        {errors.name && (
                            <div className="text-sm font-bold text-center text-red-500">
                                {errors.name.message}
                            </div>
                        )}
                    </li>
                    <li className="p-2">
                        <div className="form-control">
                            <div className="input-group focus:bg-transparent ">
                                <input
                                    type="text"
                                    {...register("name", {
                                        required: "Todo is required"
                                    })}
                                    placeholder="Add a Todo..."
                                    className="input input-bordered focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    onClick={handleSubmit(onHandleSubmit)}
                                    className="btn btn-square focus:outline-none">
                                    <FaSave className="text-xl" />
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default TodoAddButton;
