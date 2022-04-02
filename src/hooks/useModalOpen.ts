import { useContext } from "react"

import { ModalOpenContext } from "../contexts/ModalOpenContext"

export function useModalOpen() {
    const value = useContext(ModalOpenContext)

    return value
}