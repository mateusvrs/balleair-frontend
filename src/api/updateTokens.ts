import { UpdateTokensResponseType } from "../types/api/updateTokens";

export async function updateTokens(refreshToken: string | undefined): Promise<UpdateTokensResponseType> {
    if (refreshToken) {
        var updateTokensResponse: UpdateTokensResponseType = [{error: "Something wrong happened and the tokens were not updated"}, 'ERROR'];

        await fetch(`${process.env.REACT_APP_API_URL}/users/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'refresh': refreshToken
            })
        }).then(response => response.json()).then(tokenData => {
            updateTokensResponse = [tokenData, 'UPDATED']
        }).catch((error: Error) => {
            updateTokensResponse =  [{error: error.message}, 'ERROR'];
        })
       
        return updateTokensResponse
    } else {
        return [{error: "You don't have a valid refresh token"}, 'ERROR']
    }
}