import { ReactNode } from "react"

import { Airline, Traveler } from "../api/signIn"

export interface AuthContextProviderProps {
    children: ReactNode
}

export interface UserContextType {
    access: string
    refresh: string
    user: Traveler | Airline
}

export interface AuthContextType {
    user: UserContextType | undefined
    setUser: (value: UserContextType | undefined) => void
}
