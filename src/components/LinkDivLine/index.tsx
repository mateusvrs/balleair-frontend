import { Link } from "react-router-dom"

import './styles.scss'

import { LinkDivLineProps } from "../../types/components/LinkDivLine"

export function LinkDivLine({ children, link }: LinkDivLineProps) {
    return (
        <div className="link-div-container">
            <div className="line"></div>
            {children} <Link to={link}>Clique aqui</Link>
            <div className="line"></div>
        </div>
    )
}
