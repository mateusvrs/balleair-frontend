export async function bookFlight(accessToken: string, flightNumber: string): Promise<[data: {response: string}, type: 'BOOKED' | 'ERROR']> {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/flights/book/${flightNumber}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const bookData = await response.json()
    
    if (response.status === 200) {
        return [bookData, 'BOOKED']
    } else {
        return [bookData, 'ERROR']
    }
}
