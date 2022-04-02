import { useAuth } from "../../hooks/useAuth"
import { useModalOpen } from "../../hooks/useModalOpen"
import { useSelectedFlight } from "../../hooks/useSelectedFlight"

import { FlightCardProps } from "../../types/components/FlightCard"
import { Traveler } from '../../types/api/signIn'

export function FlightCard({ flightInfo }: FlightCardProps) {
    const { setSelectedFlight } = useSelectedFlight()
    const { setModalOpen } = useModalOpen()
    const { user } = useAuth()

    function handleFlightIcon() {
        const traveler = user!.user as Traveler
        let icon = 'add'

        traveler.traveler_flights.forEach(flight => {
            if (flight.flight_number === flightInfo.flight_number) {
                icon = 'close'
                return
            }
        })
        return icon
    }

    return (
        <div className="flight-card-container">
            <main>
                <section className="header-flight-card">
                    <h1>{flightInfo.airline}</h1>
                    <span>{flightInfo.flight_number}</span>
                </section>
                <section className="body-fligh-card">
                    {flightInfo.departure_airport}
                    <span className="material-icons-outlined">arrow_forward</span>
                    {flightInfo.arrival_airport}
                    <br />
                    <span>({new Date(Date.parse(flightInfo.flight_date)).toUTCString()})</span>
                </section>
            </main>
            <aside>
                {user?.user.owner.is_traveler ?
                    <button onClick={() => {
                        setSelectedFlight(flightInfo.flight_number)
                        setModalOpen(true)
                    }}>
                        <span className="material-icons-outlined">
                            {handleFlightIcon()}
                        </span>
                    </button> :
                    <button onClick={() => {
                        setSelectedFlight(flightInfo.flight_number)
                        setModalOpen(true)
                    }}>
                        <span className="material-icons-outlined">delete</span>
                    </button>}
            </aside>
        </div>
    )
}
