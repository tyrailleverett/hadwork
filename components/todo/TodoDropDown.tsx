import { BsThreeDots } from "react-icons/bs";
import { DropDownMenuProps } from "../../shared/sharedtypes";

const TodoDropDown = ({ setIsEditing, setFocus }: DropDownMenuProps) => {
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
                    <p onClick={handleOnEdit}>Edit</p>
                </li>
                <li>
                    <label htmlFor="todoDeleteModal" className="modal-button">
                        Delete
                    </label>
                </li>
            </ul>
        </div>
    );
};

export default TodoDropDown;
