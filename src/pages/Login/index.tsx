import { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { DefaultButton } from "../../components/DefaultButton"
import { DefaultInput } from "../../components/DefaultInput"
import { AsideRegisterLogo } from "../../components/AsideRegisterPage"
import { LinkDivLine } from '../../components/LinkDivLine'

import { useAuth } from "../../hooks/useAuth"
import { useLoading } from "../../hooks/useLoading"

import { defaultLoginForm, LoginFormType } from "../../types/components/LoginForm"
import { UserContextType } from "../../types/contexts/AuthContext"

import '../../assets/scss/generalAccessPages.scss'

import { logIn } from "../../api/logIn"

export function LoginPage() {
    const navigate = useNavigate()
    const [loginForm, setLoginForm] = useState(defaultLoginForm as LoginFormType)
    const [isSubmitButtonDisable, setIsSubmitButtonDisable] = useState(true)
    const { setUser } = useAuth()
    const { setIsLoading } = useLoading()

    async function handleUserLogin(event: FormEvent) {
        event.preventDefault()
        const [data, type] = await logIn(loginForm)

        if (type === 'LOGIN') {
            const user = data as UserContextType
            const formElement = document.getElementById('login-form')
            formElement?.classList.remove('error')

            setUser(user)
            setIsLoading(false)
            navigate('/home')
        } else if (type === 'ERROR') {
            const formElement = document.getElementById('login-form')
            formElement?.classList.add('error')
        }
    }

    useEffect(() => {
        if (loginForm.username.trim() === '' || loginForm.password.trim() === '') {
            setIsSubmitButtonDisable(true)
        } else {
            setIsSubmitButtonDisable(false)
        }

    }, [loginForm, setIsSubmitButtonDisable])

    return (
        <div id='login-page'>
            <main>
                <div className="container">
                    <p>Faça seu login</p>
                    <form onSubmit={(event) => handleUserLogin(event)} id='login-form'>
                        <div id='username'>
                            <DefaultInput name='username' type='text' placeholder='Username'
                                onChange={(event) => setLoginForm({ ...loginForm, [event.target.name.trim()]: event.target.value.trim() })}
                                value={loginForm.username} />
                        </div>
                        <div id='password'>
                            <DefaultInput name='password' type='password' placeholder='Senha'
                                onChange={(event) => setLoginForm({ ...loginForm, [event.target.name.trim()]: event.target.value.trim() })}
                                value={loginForm.password} />
                        </div>
                        <DefaultButton disabled={isSubmitButtonDisable} type='submit'>
                            {isSubmitButtonDisable ? 'Complete todos os campos' : 'Login'}
                        </DefaultButton>
                    </form>
                    <LinkDivLine link='/'>Não possui uma conta?</LinkDivLine>
                </div>
            </main>
            <AsideRegisterLogo />
        </div>
    )
}
