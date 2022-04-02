import logoImg from '../../assets/images/logo.svg'

import './styles.scss'

export function AsideRegisterLogo() {
    return (
        <aside>
            <h1>BalleAir</h1>
            <div className='logo-container'>
                <img src={logoImg} alt="BalleAir logo" />
                <p><span className="slogan">O melhor site para reservar passagens aéreas.</span></p>
            </div>
        </aside>
    )
}
