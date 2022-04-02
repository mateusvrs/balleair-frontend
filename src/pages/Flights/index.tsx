import { Fragment, useEffect, useState } from "react"
import Modal from 'react-modal'
import toast, { Toaster } from "react-hot-toast"

import { deleteFlight } from "../../api/deleteFlight"

import { FlightCard } from "../../components/FlightCard"
import { MainHeader } from "../../components/MainHeader"
import { DefaultButton } from "../../components/DefaultButton"

import { useAuth } from "../../hooks/useAuth"
import { useSelectedFlight } from "../../hooks/useSelectedFlight"
import { useModalOpen } from "../../hooks/useModalOpen"

import { Airline, Traveler } from "../../types/api/signIn"
import { FlightCardInfoType } from "../../types/components/FlightCard"

import './styles.scss'
import '../../components/FlightCard/styles.scss'
import { cancelFlight } from "../../api/cancelFlight"
import { CreateFlightBox } from "../../components/CreateFlightBox"

export function FlightsPage() {
    const { modalOpen, setModalOpen } = useModalOpen()
    const { selectedFlight, setSelectedFlight } = useSelectedFlight()
    const [flights, setFlights] = useState([] as FlightCardInfoType[])
    const { user, setUser } = useAuth()

    async function handleDeleteFlight() {
        if (user) {
            const type = await deleteFlight(user.access, selectedFlight)

            if (type === 'DELETED') {
                toast.success('Voo deletado.')
                const airline = user.user as Airline
                const new_airline_flights = airline.airline_flights.filter(flight => flight.flight_number !== selectedFlight)
                setUser({
                    ...user, user: {
                        ...(user.user),
                        traveler_flights: new_airline_flights
                    }
                })
            } else if (type === 'ERROR') {
                toast.error('Desculpe, não foi possível deletar o voo.')
            }
            setSelectedFlight('')
            setModalOpen(false)
        }
    }

    async function handleCancelFlight() {
        if (user) {
            const [data, type] = await cancelFlight(user.access, selectedFlight)

            if (type === 'CANCELED') {
                toast.success('Reserva cancelada.')
                const traveler = user.user as Traveler
                const new_traveler_flights = traveler.traveler_flights.filter(flight => flight.flight_number !== selectedFlight)
                setUser({
                    ...user, user: {
                        ...(user.user),
                        traveler_flights: new_traveler_flights
                    }
                })
            } else if (type === 'ERROR') {
                toast.error('Desculpe, não foi possível cancelar a reservar.')
            }
            setSelectedFlight('')
            setModalOpen(false)
        }
    }

    useEffect(() => {
        function setUserFlights() {
            if (user?.user.owner.is_traveler) {
                const traveler = user!.user as Traveler
                setFlights(traveler.traveler_flights)
            } else if (user?.user.owner.is_airline) {
                const airline = user!.user as Airline
                setFlights(airline.airline_flights)
            }
        }
        setUserFlights()
    }, [user])

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
                    <p>{user?.user.owner.is_traveler ? 'Realmente deseja cancelar essa reserva?' : 'Realmente deseja deletar esse voo da companhia?'}</p>
                    <section className="buttons-container">
                        <DefaultButton className='back' type="button" onClick={() => {
                            setSelectedFlight('')
                            setModalOpen(false)
                        }}>Voltar</DefaultButton>
                        <DefaultButton type="button" className={user?.user.owner.is_traveler ? 'cancel' : 'delete'} onClick={() => {
                            if (user?.user.owner.is_traveler) {
                                handleCancelFlight()
                            } else {
                                handleDeleteFlight()
                            }
                        }}>
                            {user?.user.owner.is_traveler ? 'Cancelar' : 'Deletar'}
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
                        {user?.user.owner.is_traveler ? 'Essas são as suas reservas.' : 'Esses são os voos da companhia.'}
                    </p>
                </section>
                {user?.user.owner.is_airline && <CreateFlightBox />}
                <section className="flights-container">
                    {flights.length ? flights.map((flight, index) => {
                        return <FlightCard flightInfo={flight} key={index} />
                    }) : 'Sem voos'}
                </section>
            </main>
        </Fragment>
    )
}
