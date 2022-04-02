import { FlightCardInfoType } from "../components/FlightCard"

export interface Traveler {
    owner: {
        id: number
        username: string
        email: string
        is_traveler: boolean
        is_airline: boolean
    }
    traveler_flights: FlightCardInfoType[]
}

export interface Airline {
    owner: {
        id: number
        username: string
        email: string
        is_traveler: boolean
        is_airline: boolean
    }
    trade_name: string
    official_name: string
    acronym: string
    airline_flights: FlightCardInfoType[]
}

export interface UserError {
    error?: string
}

export type SignInResponseType = [data: Traveler | UserError, type: 'SIGN_IN' | 'ERROR']
