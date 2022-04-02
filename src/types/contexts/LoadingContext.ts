import { ReactNode } from "react"

export type LoadingContextProviderProps = {
    children: ReactNode
}

export type LoadingContextType = {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
}
