import { Airline, Traveler } from "../types/api/signIn"

export async function getUserInfo(accessToken: string): Promise<Traveler | Airline | undefined> {
    var getUserInfoResponse;

    await fetch(`${process.env.REACT_APP_API_URL}/users/info/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(response => response.json()).then(userData => {
        getUserInfoResponse = userData as Traveler | Airline
    }).catch(() => {
        getUserInfoResponse = undefined
    })

    return getUserInfoResponse
}
