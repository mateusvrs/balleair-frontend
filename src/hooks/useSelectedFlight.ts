import { useContext } from "react"

import { SelectedFlightContext } from "../contexts/SelectedFlightContext"

export function useSelectedFlight() {
    const context = useContext(SelectedFlightContext)

    return context
}