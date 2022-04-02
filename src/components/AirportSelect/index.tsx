import { Fragment, useEffect, useState } from "react"
import Select from 'react-select'

import { useAuth } from "../../hooks/useAuth"

import { FlightFormType, SelectedArrivalType, SelectedDepartureType, SelectedType } from "../../types/pages/Home"

interface AirportSelectProps {
    stateFlightForm: [FlightFormType, React.Dispatch<React.SetStateAction<FlightFormType>>]
}

export function AirportSelect({ stateFlightForm }: AirportSelectProps) {
    const { user } = useAuth()
    const [flightForm, setFlightForm] = stateFlightForm
    const [airportOptions, setAirportOptions] = useState([] as SelectedType[])

    function handleDepartureSelect(selectedDeparture: SelectedDepartureType) {
        setFlightForm({ ...flightForm, departure_airport: selectedDeparture ? selectedDeparture.value : '' })
    }

    function handleArrivalSelect(selectedArrival: SelectedArrivalType) {
        setFlightForm({ ...flightForm, arrival_airport: selectedArrival ? selectedArrival.value : '' })
    }

    useEffect(() => {
        async function airportsRetrieve() {
            const airports = window.sessionStorage.getItem('airports')
            if (airports) {
                setAirportOptions(JSON.parse(airports))
            } else {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/flights/airports/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user?.access}`
                    }
                })
                const data: Array<Array<string>> = await response.json()

                if (response.status === 200) {
                    const airports: SelectedType[] = []
                    data.forEach(airportInfo => {
                        airports.push({ value: airportInfo[0], label: airportInfo[1] })
                    })
                    window.sessionStorage.setItem('airports', JSON.stringify(airports))
                    setAirportOptions(airports)
                }
            }
        }
        airportsRetrieve()
    }, [])

    return (
        <Fragment>
            <Select
                placeholder='Digite a origem'
                onChange={handleDepartureSelect}
                value={{value: flightForm.departure_airport, label: airportOptions.filter(airport => airport.value === flightForm.departure_airport)[0]?.label}}
                options={airportOptions}
                isClearable={true}
            />
            <span className="material-icons-outlined">arrow_forward</span>
            <Select
                placeholder='Digite o destino'
                value={{value: flightForm.arrival_airport, label: airportOptions.filter(airport => airport.value === flightForm.arrival_airport)[0]?.label}}
                onChange={handleArrivalSelect}
                options={airportOptions}
                isClearable={true}
            />
        </Fragment>
    )
}
