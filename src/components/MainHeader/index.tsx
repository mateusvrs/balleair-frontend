import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'

import { useAuth } from '../../hooks/useAuth'

import './styles.scss'

export function MainHeader() {
    const [optionsOpen, setOptionOpen] = useState(false)
    const { user } = useAuth()

    return (
        <header className='main-header'>
            <div className={`options-container ${optionsOpen ? 'open' : 'close'}`}>
                <div className="blur"></div>
                <div className="options">
                    <div className="links">
                        {user?.user.owner.is_traveler ?
                            <Fragment>
                                <Link to='/flights'>Minhas Reservas</Link>
                                <Link to='/home'>Home</Link>
                            </Fragment> :
                            <Link to='/login'>Login</Link>
                        }
                    </div>
                </div>
            </div>
            <img src={logoImg} alt="balleair logo" />
            {user?.user.owner.is_traveler &&
                <button type="button" className={`menu-container ${optionsOpen ? 'open' : 'close'}`} onClick={() => setOptionOpen(!optionsOpen)}>
                    <div className="menu-line"></div>
                    <div className="menu-line"></div>
                    <div className="menu-line"></div>
                </button>
            }
        </header>
    )
}