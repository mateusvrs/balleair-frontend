export async function cancelFlight(accessToken: string, flightNumber: string): Promise<[data: {response: string}, type: 'CANCELED' | 'ERROR']> {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/flights/cancel/${flightNumber}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const cancelData = await response.json()
    
    if (response.status === 200) {
        return [cancelData, 'CANCELED']
    } else {
        return [cancelData, 'ERROR']
    }
}
