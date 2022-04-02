import { ButtonHTMLAttributes } from 'react'

import './styles.scss'

type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
}

export function DefaultButton({className='', ...props}: DefaultButtonProps) {

    return (
        <button {...props} className={`default-button ${className}`} />
    )
}
