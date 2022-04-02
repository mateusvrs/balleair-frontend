import { JWTTokensError } from "../types/api/updateTokens"
import { LoginFormType } from "../types/components/LoginForm"
import { UserContextType } from "../types/contexts/AuthContext"

import { getUserInfo } from "./getUserInfo"

export async function logIn(userInfo: LoginFormType): Promise<[data: UserContextType | JWTTokensError | undefined, type: 'LOGIN' | 'ERROR']> {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    const tokenData = await response.json()

    if (response.status === 200) {
        const user = await getUserInfo(tokenData.access)

        if (user) {
            const userResponse = {
                ...tokenData,
                user
            } as UserContextType
            return [userResponse, 'LOGIN']
        } else {
            return [user, 'ERROR']
        }
    } else {
        const error = tokenData as JWTTokensError
        return [error, 'ERROR']
    }
}
