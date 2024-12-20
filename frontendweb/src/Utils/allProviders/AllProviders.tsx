import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";

interface AllProvidersProps{
    children: ReactNode;
}

export function AllProviders({children}: AllProvidersProps)
{
    return (
        <>
            <QueryClientProvider client={new QueryClient()}>
                {children}
            </QueryClientProvider>
        </>
    );
}
