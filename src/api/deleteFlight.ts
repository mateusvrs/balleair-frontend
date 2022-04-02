export async function deleteFlight(accessToken: string, flightNumber: string): Promise<'DELETED' | 'ERROR'> {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/flights/detail/${flightNumber}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    if (response.status === 204) {
        return 'DELETED'
    } else {
        return 'ERROR'
    }
}
