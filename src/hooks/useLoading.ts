import { useContext } from "react"

import { LoadingContext } from "../contexts/LoadingContext"

export function useLoading() {
    const value = useContext(LoadingContext)

    return value
}