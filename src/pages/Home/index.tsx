import { FormEvent, Fragment, useEffect, useState } from "react"
import Modal from 'react-modal'
import toast, { Toaster } from "react-hot-toast"

import { retrieveFlights } from "../../api/retrieveFlight"
import { bookFlight } from "../../api/bookFlight"

import { DefaultButton } from "../../components/DefaultButton"
import { DefaultInput } from "../../components/DefaultInput"
import { FlightCard } from "../../components/FlightCard"
import { MainHeader } from "../../components/MainHeader"
import { AirportSelect } from "../../components/AirportSelect"

import { useAuth } from "../../hooks/useAuth"
import { useSelectedFlight } from "../../hooks/useSelectedFlight"
import { useModalOpen } from "../../hooks/useModalOpen"

import { FlightCardInfoType } from "../../types/components/FlightCard";
import { defaultFlightForm } from "../../types/pages/Home"
import { Traveler } from "../../types/api/signIn"

import './styles.scss'
import '../../components/FlightCard/styles.scss'


export function HomePage() {
    const { modalOpen, setModalOpen } = useModalOpen()
    const { selectedFlight, setSelectedFlight } = useSelectedFlight()

    const [flights, setFlights] = useState([] as FlightCardInfoType[])

    const stateFlightForm = useState(defaultFlightForm)
    const [searchFlightForm, setSearchFlightForm] = stateFlightForm
    const [minDate, setMinDate] = useState<string>()

    const { user } = useAuth()

    async function handleFlightSearch(event: FormEvent) {
        event.preventDefault()
        if (user) {
            let flightsData = await retrieveFlights(user.user, user.access, searchFlightForm)
            if (flightsData) {
                setFlights(flightsData)
            }
        }
    }

    async function handleBookFlight() {
        if (user) {
            const [, type] = await bookFlight(user.access, selectedFlight)

            if (type === 'BOOKED') {
                toast.success('Reserva feita.')
                const new_flights = flights.filter(flight => flight.flight_number !== selectedFlight)
                setFlights(new_flights)
            } else if (type === 'ERROR') {
                toast.error('Desculpa, não foi possível fazer a reserva.')
            }
            setSelectedFlight('')
            setModalOpen(false)
        }
    }

    useEffect(() => {
        function setMinDateToInputForm() {
            const date = new Date();
            const yy = String(date.getFullYear())
            const mm = String(date.getMonth() + 1).padStart(2, '0')
            const dd = String(date.getDate()).padStart(2, '0')
            const minDate = `${yy}-${mm}-${dd}`
            setMinDate(minDate)
            setSearchFlightForm({ ...searchFlightForm, flight_date: minDate })
        }
        setMinDateToInputForm()
    }, [])

    Modal.setAppElement('body')

    return (
        <Fragment>
            <Toaster toastOptions={{
                style: {
                    backgroundColor: 'hsl(43, 100%, 67%)',
                    color: 'hsl(346, 16%, 16%)'
                }
            }} />
            <Modal isOpen={modalOpen} className='Modal'>
                <div className="container">
                    <p>Realmente deseja reservar essa passagem?</p>
                    <section className="buttons-container">
                        <DefaultButton className='back' type="button" onClick={() => {
                            setSelectedFlight('')
                            setModalOpen(false)
                        }}>Voltar</DefaultButton>
                        <DefaultButton type="button" className='book' onClick={() => handleBookFlight()}>
                            Reservar
                        </DefaultButton>
                    </section>
                </div>
            </Modal>
            <MainHeader />
            <main>
                <section className="top-container">
                    <h1>BalleAir</h1>
                    <p>
                        Seja bem vindo(a) {user?.user.owner.username}.<br />
                        Encontre o voo perfeito para você!
                    </p>
                </section>
                <section className="search-container">
                    <form onSubmit={(event) => handleFlightSearch(event)}>
                        <section className="airports-container">
                           <AirportSelect stateFlightForm={stateFlightForm} />
                        </section>
                        <DefaultInput type='date' min={minDate} value={searchFlightForm.flight_date} onChange={(event) => setSearchFlightForm({ ...searchFlightForm, flight_date: event.target.value })} />
                        <DefaultButton type="submit">
                            <span className="material-icons-outlined">
                                search
                            </span>
                        </DefaultButton>
                    </form>
                </section>
                <section className="flights-container">
                    {flights.map((flight, index) => {
                        if (user?.user.owner.is_traveler) {
                            const traveler = user!.user as Traveler
                            for (let travelerFlight = 0; travelerFlight < traveler.traveler_flights.length; travelerFlight++) {
                                if (flight.flight_number === traveler.traveler_flights[travelerFlight].flight_number) {
                                    return null
                                }
                            }
                        }
                        return <FlightCard flightInfo={flight} key={index} />
                    })}
                </section>
            </main>
        </Fragment>
    )
}
