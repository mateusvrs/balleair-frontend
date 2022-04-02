import { Airline, Traveler } from "../types/api/signIn"
import { FlightCardInfoType } from "../types/components/FlightCard"
import { FlightFormType } from "../types/pages/Home"

export async function retrieveFlights(userInfo: Traveler | Airline, accessToken: string, flightInfo: FlightFormType): Promise<FlightCardInfoType[] | undefined> {
    const queryParameters = Object.keys(flightInfo).map(key => `${key}=${flightInfo[key as keyof FlightFormType]}`).join('&')

    var airline: number | undefined = undefined;
    if (userInfo.owner.is_airline){
        airline = userInfo.owner.id
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/flights/retrieve/?${queryParameters}${airline ? `&airline=${airline}` : '&airline='}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const flightsData = await response.json()
    
    if (response.status === 200) {
        return flightsData
    }
}
