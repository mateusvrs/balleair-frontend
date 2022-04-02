export interface TokensType {
    access: string
    refresh: string
}

export interface JWTTokensError {
    error: string
}

export type UpdateTokensResponseType = [data: TokensType | JWTTokensError, type: 'UPDATED' | 'ERROR']