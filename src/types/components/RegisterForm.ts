export interface RegisterBaseType {
    username: string
    email: string
    password: string
    password_confirmation: string
}

export interface RegisterFormType {
    owner: {
        username: string
        email: string
        password: string
        password_confirmation: string
    }
}

export const inputInfos: RegisterBaseType = {
    username: 'Username',
    email: 'Email',
    password: 'Password',
    password_confirmation: 'Password Confirmation'
}

export const defaultRegisterForm: RegisterFormType = {
    owner: {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    }
}
