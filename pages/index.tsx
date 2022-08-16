import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Drawer from "../components/drawer/Drawer";
import TodoSection from "../components/todo/TodoSection";
import { AppUserType, IdOnlyProps } from "../shared/sharedtypes";
import { getUser } from "../utils/helperfunctions";
import { useProjectStore } from "../zustand/projectstore";
import { authOptions } from "./api/auth/[...nextauth]";

const Home: NextPage<IdOnlyProps> = ({ id }) => {
    const { setActiveProject } = useProjectStore();

    const [isOpen, setIsOpen] = useState(true);

    useQuery<AppUserType, Error>(["user"], () => getUser(id), {
        onError: () => {
            signOut({ redirect: true, callbackUrl: "/signin" });
        }
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const currentActiveProject = localStorage.getItem("activeProject");

            if (currentActiveProject !== "undefined") {
                setActiveProject(JSON.parse(currentActiveProject!));
            } else {
                setActiveProject(null);
            }

            const isDrawerOpen = localStorage.getItem("isOpen");
            if (isDrawerOpen !== "undefined" && isDrawerOpen !== null) {
                setIsOpen(JSON.parse(isDrawerOpen!));
            }
        }
    }, []);

    return (
        <div>
            <Head>
                <title>HadWork</title>
            </Head>

            <main
                className={`w-screen h-screen grid duration-200 ${
                    isOpen
                        ? "grid-cols-[99%_1%] lg:grid-cols-[15%_85%]"
                        : "grid-cols-[1%_99%]"
                } `}>
                <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
                <TodoSection isOpen={isOpen} />
            </main>
        </div>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await unstable_getServerSession(
        ctx.req,
        ctx.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false
            }
        };
    }

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["user"], () => getUser(session.user.id));

    return {
        props: {
            deydratedState: dehydrate(queryClient),
            id: session.user.id
        }
    };
};
