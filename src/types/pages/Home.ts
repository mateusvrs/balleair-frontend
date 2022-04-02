import { SingleValue } from "react-select"

export interface FlightFormType {
    pax: {
        available: string
    }
    departure_airport: string
    arrival_airport: string
    flight_date: string
    aircraft: string
}

export const defaultFlightForm: FlightFormType = {
    pax: {
        available: ''
    },
    departure_airport: '',
    arrival_airport: '',
    flight_date: '',
    aircraft: ''
}


export interface SelectedType {
    value: string
    label: string
}

export type SelectedDepartureType = SingleValue<SelectedType>
export type SelectedArrivalType = SingleValue<SelectedType>
