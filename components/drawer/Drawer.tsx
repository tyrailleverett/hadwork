import { useQuery } from "@tanstack/react-query";
import { FaChevronCircleLeft } from "react-icons/fa";
import AddProjectSection from "../../components/drawer/AddProjectSection";
import DrawerHeader from "../../components/drawer/DrawerHeader";
import ProjectCard from "../../components/project/ProjectCard";
import { ProjectType } from "../../shared/sharedtypes";
import customAxios from "../../utils/axios";
import { DrawerProps } from "./drawertypes";

const Drawer = ({ setIsOpen, isOpen }: DrawerProps) => {
    const getProjects = async () => {
        const result = await customAxios.get("/project/getprojects");
        return await result.data;
    };

    const { data } = useQuery<ProjectType[], Error>(["projects"], getProjects);

    const handleDrawerOpen = () => {
        setIsOpen(!isOpen);
        localStorage.setItem("isOpen", JSON.stringify(!isOpen));
    };

    return (
        <aside
            className={` pt-5 relative duration-200 rounded-r-lg bg-base-200 ${
                isOpen ? "w-full px-3" : "w-0 px-1"
            }`}>
            <FaChevronCircleLeft
                onClick={handleDrawerOpen}
                className={`absolute cursor-pointer -right-3 top-3 text-xl ${
                    isOpen ? "" : "rotate-180"
                }`}
            />

            {isOpen ? (
                <>
                    <DrawerHeader />
                    <AddProjectSection />
                    <div className="m-0 mx-2 divider"></div>
                    {data &&
                        data.map((project) => {
                            return (
                                <ProjectCard
                                    key={project.name}
                                    name={project.name}
                                />
                            );
                        })}
                </>
            ) : null}
        </aside>
    );
};

export default Drawer;
