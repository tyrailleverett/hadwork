import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FaCog, FaSignOutAlt } from "react-icons/fa";

const DrawerHeader = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const firstInitial = session?.user?.username?.charAt(0).toUpperCase();
    return (
        <div className="flex items-center justify-between px-2 mt-4">
            <h1 className="text-3xl font-bold">HadWork</h1>
            <div className="dropdown dropdown-left md:dropdown-right">
                <div
                    tabIndex={0}
                    className="avatar placeholder hover:cursor-pointer ">
                    <div className="w-10 rounded-full bg-accent hover:ring ring-accent-focus">
                        <label className="text-xl">{firstInitial}</label>
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="w-40 p-2 border shadow dropdown-content menu bg-base-100 rounded-box">
                    <li onClick={() => router.push("/user/userprofile")}>
                        <p className="p-2">
                            <FaCog />
                            Settings
                        </p>
                    </li>
                    <div className="p-0 m-0 divider"></div>
                    <li
                        onClick={() =>
                            signOut({
                                redirect: true,
                                callbackUrl: "/signin"
                            })
                        }>
                        <p className="p-2">
                            <FaSignOutAlt /> Sign out
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DrawerHeader;
