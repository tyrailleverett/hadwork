import { useState } from "react";
import { useDrag } from "react-dnd";
import { useForm } from "react-hook-form";
import { FormDataType } from "../../shared/sharedtypes";
import { useProjectStore } from "../../zustand/projectstore";
import TodoDeleteModal from "./TodoDeleteModal";
import TodoDropDown from "./TodoDropDown";
import TodoEditingIcons from "./TodoEditingIcons";
import { TodoCardProps } from "./todotypes";

const TodoCard = ({ todo }: TodoCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const { activeProject } = useProjectStore();

    const ItemTypes = {
        CARD: "card"
    };

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: {
            id: todo.id,
            projectId: activeProject?.id
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    const {
        handleSubmit,
        register,
        setFocus,
        reset,
        formState: { errors }
    } = useForm<FormDataType>({
        defaultValues: { name: todo.name }
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
                ref={drag}
                className={`flex items-center my-1 pr-3 rounded-md bg-base-100 ${
                    isDragging ? "opacity-50" : "opacity-100"
                }`}>
                <input
                    type="text"
                    {...register("name", { required: "Todo is required" })}
                    className={`flex-1 py-10 font-semibold input focus:outline-none ${
                        isEditing ? "cursor-text" : "cursor-grab"
                    }`}
                    readOnly={!isEditing}
                />
                {isEditing ? (
                    <TodoEditingIcons
                        handleOnCancel={handleOnCancel}
                        handleSubmit={handleSubmit}
                        setIsEditing={setIsEditing}
                        todo={todo}
                    />
                ) : (
                    <TodoDropDown
                        setFocus={setFocus}
                        setIsEditing={setIsEditing}
                    />
                )}
            </div>
            <TodoDeleteModal
                todoId={todo.id!}
                handleOnCancel={handleOnCancel}
            />
        </>
    );
};

export default TodoCard;
