import { ReactNode } from "react"

export type ModalOpenContextProviderProps = {
    children: ReactNode
}

export type ModalOpenContextType = {
    modalOpen: boolean
    setModalOpen: (value: boolean) => void
}
