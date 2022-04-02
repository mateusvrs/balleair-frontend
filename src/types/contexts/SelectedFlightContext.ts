import { ReactNode } from "react"

export type SelectedFlightContextProviderProps = {
    children: ReactNode
}

export type SelectedFlightContextType = {
    selectedFlight: string
    setSelectedFlight: (value: string) => void
}
