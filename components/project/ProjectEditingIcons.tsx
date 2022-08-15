import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsCheck, BsX } from "react-icons/bs";
import { toast } from "react-toastify";
import { FormDataType } from "../../shared/sharedtypes";
import customAxios from "../../utils/axios";
import { useProjectStore } from "../../zustand/projectstore";
import { ProjectEditingIconsProps, UpdateProjectType } from "./projecttypes";

const ProjectEditingIcons = ({
    handleOnCancel,
    handleSubmit,
    setIsEditing
}: ProjectEditingIconsProps) => {
    const { activeProject, setActiveProject } = useProjectStore();
    const queryClient = useQueryClient();

    const updateProject = ({ id, name }: UpdateProjectType) => {
        return customAxios.patch("/project/updateproject", {
            data: { id, name }
        });
    };

    const handleOnSubmit = (formData: FormDataType) => {
        if (activeProject?.name === formData.name) {
            setIsEditing(false);
            return;
        }
        if (activeProject) {
            updateProjectMutation.mutate({
                id: activeProject!.id,
                name: formData.name
            });
        }
    };

    const updateProjectMutation = useMutation(updateProject, {
        onError: (error) => {
            toast.error(error as string);
        },
        onSettled: async (updatedProject) => {
            await queryClient.invalidateQueries(["projects"]);
            setActiveProject(updatedProject?.data);
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

export default ProjectEditingIcons;
