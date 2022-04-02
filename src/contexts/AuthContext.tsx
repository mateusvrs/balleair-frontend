import { createContext, useState } from "react";

import { AuthContextProviderProps, AuthContextType, UserContextType } from "../types/contexts/AuthContext";

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserContextType>()

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
