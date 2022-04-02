export interface FlightCardInfoType {
    airline: string
    flight_number: string
    departure_airport: string
    arrival_airport: string
    flight_date: string
}

export interface FlightCardProps {
    flightInfo: FlightCardInfoType
}