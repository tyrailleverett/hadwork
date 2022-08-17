import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ProjectType } from "../../shared/sharedtypes";
import customAxios from "../../utils/axios";
import { useProjectStore } from "../../zustand/projectstore";
import { ProjectDeleteModalProps } from "./projecttypes";

const ProjectDeleteModal = ({ handleOnCancel }: ProjectDeleteModalProps) => {
    const { setActiveProject, activeProject } = useProjectStore();
    const queryClient = useQueryClient();

    const deleteProject = (id: number) => {
        return customAxios.delete("/project/deleteproject", { data: { id } });
    };

    const handleOnDelete = () => {
        mutate(activeProject!.id);
    };

    const { mutate } = useMutation(deleteProject, {
        onError: (error: string) => {
            toast.error(error);
        },
        onSuccess: (deletedProject) => {
            const listOfCurrentProjects = queryClient
                .getQueryData<ProjectType[]>(["projects"])
                ?.filter((project) => project.id !== deletedProject?.data.id);

            if (listOfCurrentProjects) {
                setActiveProject(listOfCurrentProjects[0]);
            } else {
                localStorage.removeItem("activeProject");
            }

            toast.success("Project deleted 🎉");
        },
        onSettled: () => {
            queryClient.invalidateQueries(["projects"]);
        }
    });

    return (
        <>
            <input
                type="checkbox"
                id="projectDeleteModal"
                className="modal-toggle"
            />
            <label
                htmlFor="projectDeleteModal"
                className="cursor-pointer modal">
                <label className="relative modal-box">
                    <p className="pb-10 text-center">
                        Are you sure you want to delete this project?
                    </p>
                    <div className="flex justify-evenly">
                        <label
                            htmlFor="projectDeleteModal"
                            onClick={handleOnCancel}
                            className="btn btn-outline btn-success">
                            Cancel
                        </label>
                        <label
                            onClick={handleOnDelete}
                            htmlFor="projectDeleteModal"
                            className="btn btn-outline btn-error">
                            Delete
                        </label>
                    </div>
                </label>
            </label>
        </>
    );
};

export default ProjectDeleteModal;
