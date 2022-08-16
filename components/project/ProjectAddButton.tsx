import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { FaPlusSquare, FaSave } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FormDataType } from "../../shared/sharedtypes";
import customAxios from "../../utils/axios";
import { useProjectStore } from "../../zustand/projectstore";

const ProjectAddButton = () => {
    const { setActiveProject } = useProjectStore();
    const { theme } = useTheme();

    const queryClient = useQueryClient();
    const {
        handleSubmit,
        register,
        setFocus,
        resetField,
        formState: { errors }
    } = useForm<FormDataType>();

    const addProject = (projectName: string) => {
        return customAxios.post("/project/addproject", { name: projectName });
    };

    const onHandleSubmit = (formData: FormDataType) => {
        addMutation.mutate(formData.name);

        resetField("name");
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    const onStartEditing = () => {
        resetField("name");
        setFocus("name");
    };

    const addMutation = useMutation(addProject, {
        onError: (error) => {
            toast.error(error as string);
        },
        onSuccess: (addedProject) => {
            toast.success("Project Added 🎉");
            setActiveProject(addedProject?.data);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["projects"]);
        }
    });

    return (
        <>
            <div className="mr-4 dropdown dropdown-left lg:dropdown-right">
                {addMutation.isLoading ? (
                    <ClipLoader
                        size={20}
                        color={`${theme === "dark" ? "#a6adba" : "#1f2937"}`}
                    />
                ) : (
                    <label tabIndex={0} className="hover:cursor-pointer">
                        <FaPlusSquare onClick={onStartEditing} />
                    </label>
                )}

                <ul
                    tabIndex={0}
                    className="p-2 border shadow dropdown-content bg-base-100 rounded-box w-fit">
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
                                        required: "Project is required"
                                    })}
                                    placeholder="Add a Project..."
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

export default ProjectAddButton;
