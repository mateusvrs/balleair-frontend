import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AsideRegisterLogo } from '../../components/AsideRegisterPage'
import { DefaultButton } from '../../components/DefaultButton'
import { DefaultInput } from '../../components/DefaultInput'
import { LinkDivLine } from '../../components/LinkDivLine'

import { defaultRegisterForm, inputInfos, RegisterBaseType, RegisterFormType } from '../../types/components/RegisterForm'
import { UserError } from '../../types/api/signIn'

import '../../assets/scss/generalAccessPages.scss'

import { signIn } from '../../api/sigIn'

export function RegisterPage() {
    const navigate = useNavigate()
    const [registerForm, setRegisterForm] = useState(defaultRegisterForm as RegisterFormType)
    const [arePasswordsEqual, setArePasswordsEqual] = useState(true)
    const [isSubmitButtonDisable, setIsSubmitButtonDisable] = useState(true)

    async function handleUserRegistration(event: FormEvent) {
        event.preventDefault()
        const [data, type] = await signIn(registerForm)

        if (type === 'SIGN_IN') {
            navigate('/login')
        } else if (type === 'ERROR') {
            const error = data as UserError

            const wrongInputElements = document.querySelectorAll('.user-exists')
            wrongInputElements.forEach(wrongInputElement => {
                wrongInputElement.classList.remove('user-exists')
            })

            Object.keys(error).forEach(key => {
                const wrongInputElement = document.getElementById(key)
                wrongInputElement?.classList.add('user-exists')
            })
        }
    }

    useEffect(() => {
        function verifyRegisterFields() {
            var allInputsAreFilled = true
            Object.keys(registerForm.owner).forEach(key => {
                if (registerForm.owner[key as keyof RegisterBaseType].trim() === '') {
                    allInputsAreFilled = false
                }
            })

            if (allInputsAreFilled) {
                if (registerForm.owner.password === registerForm.owner.password_confirmation) {
                    setArePasswordsEqual(true)
                    setIsSubmitButtonDisable(false)
                } else {
                    setArePasswordsEqual(false)
                    setIsSubmitButtonDisable(true)
                }
            } else {
                setArePasswordsEqual(true)
                setIsSubmitButtonDisable(true)
            }
        }
        verifyRegisterFields()

    }, [registerForm, setIsSubmitButtonDisable, setArePasswordsEqual])


    return (
        <div id='register-page'>
            <main>
                <div className="container">
                    <p>Cadastre-se</p>
                    <form onSubmit={(event) => handleUserRegistration(event)}>
                        {Object.keys(inputInfos).map(key => {
                            var inputType = 'text'
                            if (key === 'email') {
                                inputType = 'email'
                            } else if (['password', 'password_confirmation'].includes(key)) {
                                inputType = 'password'
                            }

                            return <div key={key} id={key}><DefaultInput name={key} type={inputType} placeholder={inputInfos[key as keyof RegisterBaseType]}
                                onChange={(event) => setRegisterForm({ owner: { ...(registerForm.owner), [event.target.name.trim()]: event.target.value.trim() } })}
                                value={registerForm.owner[key as keyof RegisterBaseType]} /></div>
                        })}
                        <DefaultButton disabled={isSubmitButtonDisable} type='submit'>
                            {isSubmitButtonDisable ? arePasswordsEqual ? 'Complete todos os campos' : 'As senhas não coincidem' : 'Cadastrar'}
                        </DefaultButton>
                    </form>
                    <LinkDivLine link='/login'>Já possui uma conta?</LinkDivLine>
                </div>
            </main>
            <AsideRegisterLogo />
        </div>
    )
}