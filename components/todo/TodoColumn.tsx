import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDrop } from "react-dnd";
import { ProjectType, TodoType } from "../../shared/sharedtypes";
import customAxios from "../../utils/axios";
import { useProjectStore } from "../../zustand/projectstore";
import TodoCard from "./TodoCard";
import ProjectCardTitle from "./TodoColumnTitle";
import { TodoColumnProps } from "./todotypes";

const TodoColumn = ({ title }: TodoColumnProps) => {
    const { activeProject, setActiveProject } = useProjectStore();
    const queryClient = useQueryClient();

    const ItemTypes = {
        CARD: "card"
    };

    const updateTodo = (todo: TodoType) => {
        return customAxios.put("/todo/updatetodo", { data: todo });
    };

    const { mutate } = useMutation(updateTodo, {
        onMutate: (movedTodo) => {
            const currentProject = queryClient
                .getQueryData<ProjectType[]>(["projects"])
                ?.filter((project) => project.id === activeProject?.id)[0];
            currentProject?.todo.map((todo) => {
                if (todo.id === movedTodo.id) {
                    todo.status = movedTodo.status;
                }
            });
            setActiveProject(currentProject!);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries(["projects"]);
            const currentProject = queryClient
                .getQueryData<ProjectType[]>(["projects"])
                ?.filter((project) => project.id === activeProject?.id)[0];
            setActiveProject(currentProject!);
        }
    });

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,

        drop: (todo: TodoType) => moveTodoCard(todo.id, todo.projectId),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const moveTodoCard = (id: number, projectId: number) => {
        const currentProject = queryClient
            .getQueryData<ProjectType[]>(["projects"])
            ?.filter((project) => project.id === projectId)[0];
        const todoToMove: TodoType = currentProject?.todo.find(
            (todo: TodoType) => id === todo.id
        )!;
        if (todoToMove.status === title) {
            return;
        }
        todoToMove.status = title;
        mutate(todoToMove);
    };

    return (
        <div
            ref={drop}
            className={`shadow-lg card bg-base-200 overflow-visible ${
                isOver ? "bg-base-300" : "bg-base-200"
            }`}>
            <ProjectCardTitle title={title} />

            <div className="p-5 card-body">
                {activeProject?.todo &&
                    activeProject.todo.map((todo) => {
                        if (todo.status === title) {
                            return <TodoCard key={todo.id} todo={todo} />;
                        }
                    })}
            </div>
        </div>
    );
};

export default TodoColumn;
