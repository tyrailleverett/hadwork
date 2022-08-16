import { useEffect, useState } from "react";
import {
    FaHourglassEnd,
    FaHourglassHalf,
    FaHourglassStart
} from "react-icons/fa";
import TodoAddButton from "./TodoAddButton";
import { TodoColumnTitleProps } from "./todotypes";

const TodoColumnTitle = ({ title }: TodoColumnTitleProps) => {
    const [titleIcon, setTitleIcon] = useState<any>();

    useEffect(() => {
        switch (title) {
            case "Todo":
                setTitleIcon(<FaHourglassStart />);
                break;
            case "Doing":
                setTitleIcon(<FaHourglassHalf />);
                break;
            case "Done":
                setTitleIcon(<FaHourglassEnd />);
                break;
        }
    }, []);
    return (
        <div className="flex items-center pt-2 pb-4 text-xl font-bold shadow">
            <div className="flex items-center justify-center flex-1">
                <p>{titleIcon}</p>
                <p className="ml-2">{title}</p>
            </div>
            {title === "Todo" && <TodoAddButton />}
        </div>
    );
};

export default TodoColumnTitle;
