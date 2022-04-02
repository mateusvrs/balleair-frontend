import { createContext, useState } from "react"

import { ModalOpenContextProviderProps, ModalOpenContextType } from "../types/contexts/ModalOpenContext"

export const ModalOpenContext = createContext({} as ModalOpenContextType)

export function ModalOpenContextProvider({ children }: ModalOpenContextProviderProps) {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <ModalOpenContext.Provider value={{ modalOpen, setModalOpen }}>
            {children}
        </ModalOpenContext.Provider>
    )
}
