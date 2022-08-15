import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ProjectType } from "../../shared/sharedtypes";
import customAxios from "../../utils/axios";
import { useProjectStore } from "../../zustand/projectstore";
import { TodoDeleteModalProps } from "./todotypes";

const TodoDeleteModal = ({ handleOnCancel, todoId }: TodoDeleteModalProps) => {
    const { activeProject, setActiveProject } = useProjectStore();
    const queryClient = useQueryClient();

    const handleOnDelete = () => {
        mutate(todoId!);
    };

    const deleteTodo = (id: number) => {
        return customAxios.delete("/todo/deletetodo", { data: { id } });
    };

    const { mutate } = useMutation(deleteTodo, {
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
            toast.success("Todo deleted 🎉");
        }
    });

    return (
        <>
            <input
                type="checkbox"
                id="todoDeleteModal"
                className="modal-toggle"
            />
            <label htmlFor="todoDeleteModal" className="cursor-pointer modal">
                <label className="relative modal-box">
                    <p className="pb-10 text-center">
                        Are you sure you want to delete this todo?
                    </p>
                    <div className="flex justify-evenly">
                        <label
                            htmlFor="todoDeleteModal"
                            onClick={handleOnCancel}
                            className="btn btn-outline btn-success">
                            Cancel
                        </label>
                        <label
                            onClick={handleOnDelete}
                            htmlFor="todoDeleteModal"
                            className="btn btn-outline btn-error">
                            Delete
                        </label>
                    </div>
                </label>
            </label>
        </>
    );
};

export default TodoDeleteModal;
