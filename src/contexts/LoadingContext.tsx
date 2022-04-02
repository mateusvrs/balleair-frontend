import { createContext, useState } from "react";

import { LoadingContextProviderProps, LoadingContextType } from "../types/contexts/LoadingContext";

export const LoadingContext = createContext({} as LoadingContextType)

export function LoadingContextProvider(props: LoadingContextProviderProps) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {props.children}
        </LoadingContext.Provider>
    )
}
