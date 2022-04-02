import { createContext, useState } from "react"

import { SelectedFlightContextProviderProps, SelectedFlightContextType } from "../types/contexts/SelectedFlightContext"

export const SelectedFlightContext = createContext({} as SelectedFlightContextType)

export function SelectedFlightContextProvider({ children }: SelectedFlightContextProviderProps) {
    const [selectedFlight, setSelectedFlight] = useState('')

    return (
        <SelectedFlightContext.Provider value={{ selectedFlight, setSelectedFlight }}>
            {children}
        </SelectedFlightContext.Provider>
    )
}
