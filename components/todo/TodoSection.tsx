import TodoColumn from "../../components/todo/TodoColumn";
import { useProjectStore } from "../../zustand/projectstore";
import { TodoSectionProps } from "./todotypes";

const TodoSection = ({ isOpen }: TodoSectionProps) => {
    const todoTitles = ["Todo", "Doing", "Done"];
    const { activeProject } = useProjectStore();
    return (
        <section className={`${isOpen ? "hidden lg:block" : "block"}`}>
            <h2 className="mt-5 mb-10 text-3xl font-bold text-center">
                {activeProject ? activeProject.name : ""}
            </h2>
            <div className="grid grid-cols-1 gap-5 mx-2 sm:mx-10 md:grid-cols-3">
                {todoTitles.map((title) => {
                    return <TodoColumn key={title} title={title} />;
                })}
            </div>
        </section>
    );
};

export default TodoSection;
