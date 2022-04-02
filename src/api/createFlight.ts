import { FlightCardInfoType } from "../types/components/FlightCard"
import { FlightFormType } from "../types/pages/Home"

export async function createFlight(accessToken: string, flightForm: FlightFormType): Promise<[data: {response: string} | FlightCardInfoType, type: 'CREATED' | 'ERROR']> {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/flights/create/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(flightForm)
    })
    const createData = await response.json()
    
    if (response.status === 201) {
        return [createData, 'CREATED']
    } else {
        return [createData, 'ERROR']
    }
}
