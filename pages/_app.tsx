import {
    Hydrate,
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/layout/Layout";
import "../styles/globals.css";

const MyApp = ({
    Component,
    pageProps: { session, ...pageProps }
}: AppProps) => {
    const [queryClient] = useState(
        () => new QueryClient({ defaultOptions: { queries: { retry: false } } })
    );

    return (
        <SessionProvider session={session}>
            <ThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <Layout>
                            <DndProvider backend={HTML5Backend}>
                                <Component {...pageProps} />
                            </DndProvider>
                        </Layout>
                    </Hydrate>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </ThemeProvider>
        </SessionProvider>
    );
};

export default MyApp;
