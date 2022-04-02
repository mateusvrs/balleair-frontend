import { useEffect } from "react"
import { Navigate } from "react-router-dom"

import { getUserInfo } from "../../api/getUserInfo"

import { useAuth } from "../../hooks/useAuth"
import { useLoading } from "../../hooks/useLoading"

import { UserContextType } from "../../types/contexts/AuthContext"

import { LoadingCircle } from "../LoadingCircle"

interface TravelerOnlyRouteProps {
    component: JSX.Element
}

export function TravelerOnlyRoute({ component }: TravelerOnlyRouteProps) {
    const { user, setUser } = useAuth()
    const { isLoading } = useLoading()

    useEffect(() => {
        async function updateUserInfo() {
            if (user) {
                const userInfo = await getUserInfo(user.access)
                if (userInfo) {
                    setUser({ ...user, user: userInfo })
                }
            }
        }
        updateUserInfo()
    }, [])

    function checkAuth(user: UserContextType | undefined) {
        if (user) {
            if (isLoading) {
                return <LoadingCircle />
            } else {
                if (user.user.owner.is_traveler) {
                    return component
                } else {
                    return <Navigate to='/flights' />
                }
            }
        } else {
            return  <Navigate to='/login' />
        }
    }

    return checkAuth(user)
}
