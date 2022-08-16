import { BsFillTrashFill, BsPencilFill, BsThreeDots } from "react-icons/bs";
import { DropDownMenuProps } from "../../shared/sharedtypes";

const ProjectDropDown = ({ setIsEditing, setFocus }: DropDownMenuProps) => {
    const handleOnEdit = () => {
        setIsEditing(true);
        setFocus("name");
    };

    return (
        <div className=" dropdown">
            <label tabIndex={0} className="hover:cursor-pointer">
                <BsThreeDots />
            </label>
            <ul
                tabIndex={0}
                className="border rounded-lg shadow bg-base-100 dropdown-content menu w-fit">
                <li>
                    <p
                        className="flex items-center w-full p-3 justify-evenly"
                        onClick={handleOnEdit}>
                        <BsPencilFill /> Edit
                    </p>
                </li>
                <div className="p-0 m-0 divider"></div>
                <li>
                    <label
                        htmlFor="projectDeleteModal"
                        className="flex items-center p-3 justify-evenly modal-button">
                        <BsFillTrashFill />
                        Delete
                    </label>
                </li>
            </ul>
        </div>
    );
};

export default ProjectDropDown;
