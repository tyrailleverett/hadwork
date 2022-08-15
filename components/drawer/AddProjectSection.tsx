import ProjectAddButton from "../project/ProjectAddButton";

const AddProjectSection = () => {
    return (
        <div className="flex items-center justify-between mx-2 mt-16">
            <p className="text-lg font-semibold">Projects</p>
            <ProjectAddButton />
        </div>
    );
};

export default AddProjectSection;
