import { SignInResponseType, Traveler, UserError } from "../types/api/signIn"
import { RegisterFormType } from "../types/components/RegisterForm"

export async function signIn(userInfo: RegisterFormType): Promise<[data: Traveler | UserError, type: 'SIGN_IN' | 'ERROR']> {
    var signInResponse: SignInResponseType = [{ error: "Something wrong happened, try again" }, 'ERROR'];

    await fetch(`${process.env.REACT_APP_API_URL}/users/register/traveler/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    }).then(response => response.json()).then(signInData => {
        signInResponse = [signInData, 'SIGN_IN']
    }).catch((error: Error) => {
        signInResponse = [{ error: error.message }, 'ERROR'];
    })

    return signInResponse
}
