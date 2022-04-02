import { FormEvent, useEffect, useState } from "react"
import Select from 'react-select'
import toast, { Toaster } from "react-hot-toast"

import { createFlight } from "../../api/createFlight"

import { useAuth } from "../../hooks/useAuth"

import { Airline } from "../../types/api/signIn"
import { FlightCardInfoType } from "../../types/components/FlightCard"
import { SelectedAircraftType } from "../../types/components/CreateFlight"
import { defaultFlightForm, SelectedType } from "../../types/pages/Home"

import { AirportSelect } from "../AirportSelect"
import { DefaultButton } from "../DefaultButton"
import { DefaultInput } from "../DefaultInput"

import './styles.scss'


export function CreateFlightBox() {
    const { user, setUser } = useAuth()

    const stateFlightForm = useState(defaultFlightForm)
    const [flightForm, setFlightForm] = stateFlightForm

    const [aircraftOptions, setAircraftOptions] = useState([] as SelectedType[])
    const [minDate, setMinDate] = useState<string>()

    async function handleCreateFlight(event: FormEvent) {
        event.preventDefault()
        if (user?.user.owner.is_airline) {
            const [data, type] = await createFlight(user.access, flightForm)

            if (type === 'CREATED') {
                toast.success('Voo criado com sucesso.')
                const airline = user.user as Airline
                const flightData = data as FlightCardInfoType
                const newFlightData: FlightCardInfoType = {
                    airline: flightData.airline,
                    departure_airport: flightData.departure_airport,
                    arrival_airport: flightData.arrival_airport,
                    flight_date: flightData.flight_date,
                    flight_number: flightData.flight_number
                }
                setUser({...user, user: {
                    ...(user.user),
                    airline_flights: [...airline.airline_flights, newFlightData]
                }})
            } else if (type === 'ERROR') {
                toast.error('Desculpe, não foi possível criar o voo.')
            }
        }
        setFlightForm(defaultFlightForm)
    }

    function handleAircraftSelect(selectedAircraft: SelectedAircraftType) {
        setFlightForm({ ...flightForm, aircraft: selectedAircraft ? selectedAircraft.value : '' })
    }

    useEffect(() => {
        async function aircraftsRetrieve() {
            const aircrafts = window.sessionStorage.getItem('aircrafts')
            if (aircrafts) {
                setAircraftOptions(JSON.parse(aircrafts))
            } else {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/flights/aircrafts/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user?.access}`
                    }
                })
                const data: Array<Array<string>> = await response.json()

                if (response.status === 200) {
                    const aircrafts: SelectedType[] = []
                    data.forEach(airportInfo => {
                        aircrafts.push({ value: airportInfo[0], label: airportInfo[1] })
                    })
                    window.sessionStorage.setItem('aircrafts', JSON.stringify(aircrafts))
                    setAircraftOptions(aircrafts)
                }
            }
        }
        aircraftsRetrieve()

        function setMinDateToInputForm() {
            const date = new Date();
            const yy = String(date.getFullYear())
            const mm = String(date.getMonth() + 1).padStart(2, '0')
            const dd = String(date.getDate()).padStart(2, '0')
            const minDate = `${yy}-${mm}-${dd}`
            setMinDate(minDate)
            setFlightForm({ ...flightForm, flight_date: minDate })
        }
        setMinDateToInputForm()
    }, [])

    return (
        <div className="create-flight-container">
            <Toaster toastOptions={{
                style: {
                    backgroundColor: 'hsl(43, 100%, 67%)',
                    color: 'hsl(346, 16%, 16%)'
                }
            }} />
            <form onSubmit={(event) => handleCreateFlight(event)}>
                <section className="airports-container">
                    <AirportSelect stateFlightForm={stateFlightForm} />
                </section>
                <DefaultInput type='datetime-local' min={minDate} value={flightForm.flight_date} onChange={(event) => setFlightForm({ ...flightForm, flight_date: event.target.value })} />
                <section className="aircraft-container">
                    <Select
                        placeholder='Aeronave'
                        onChange={handleAircraftSelect}
                        value={{value: flightForm.aircraft, label: flightForm.aircraft}}
                        options={aircraftOptions}
                        isClearable={true}
                    />
                    <DefaultInput type='number' placeholder='Máximo de passageiros' min={0} value={flightForm.pax.available} onChange={(event) => setFlightForm({
                        ...flightForm, pax: {
                            available: event.target.value
                        }
                    })} />
                </section>
                <DefaultButton type="submit">
                    <span className="material-icons-outlined">
                        add
                    </span>
                </DefaultButton>
            </form>

        </div>
    )
}
