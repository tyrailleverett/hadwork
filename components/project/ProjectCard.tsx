import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormDataType, ProjectType } from "../../shared/sharedtypes";
import { useProjectStore } from "../../zustand/projectstore";
import ProjectDeleteModal from "./ProjectDeleteModal";
import ProjectDropDown from "./ProjectDropDown";
import ProjectEditingIcons from "./ProjectEditingIcons";
import { ProjectCardProps } from "./projecttypes";

const ProjectCard = ({ name }: ProjectCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const { setActiveProject, activeProject } = useProjectStore();
    const queryClient = useQueryClient();

    const filterProjects = (projectName: string): ProjectType => {
        return queryClient
            .getQueryData<ProjectType[]>(["projects"])!
            .filter((project: ProjectType) => project.name === projectName)[0];
    };

    const setProject = () => {
        const filteredProject = filterProjects(name);
        setActiveProject(filteredProject);
    };

    const {
        handleSubmit,
        register,
        setFocus,
        reset,
        formState: { errors }
    } = useForm<FormDataType>({
        defaultValues: { name }
    });

    const handleOnCancel = () => {
        setIsEditing(false);
        reset();
    };

    return (
        <>
            {errors.name && (
                <div className="font-bold text-red-500">
                    {errors.name.message}
                </div>
            )}
            <div
                onClick={setProject}
                className={`grid my-3 pr-3 grid-cols-[85%_15%] items-center rounded-md bg-base-100 hover:cursor-pointer ${
                    activeProject?.name === name ? "ring-4 ring-accent" : ""
                }`}>
                <input
                    type="text"
                    {...register("name", { required: "Task is required" })}
                    className={` py-8 font-semibold input focus:outline-none ${
                        isEditing ? "cursor-text" : "cursor-pointer"
                    }`}
                    readOnly={!isEditing}
                />
                {isEditing ? (
                    <ProjectEditingIcons
                        handleOnCancel={handleOnCancel}
                        handleSubmit={handleSubmit}
                        setIsEditing={setIsEditing}
                    />
                ) : (
                    <ProjectDropDown
                        setFocus={setFocus}
                        setIsEditing={setIsEditing}
                    />
                )}
            </div>
            <ProjectDeleteModal handleOnCancel={handleOnCancel} />
        </>
    );
};

export default ProjectCard;
