export const extractAccessToken = (token: string) => {
    return token?.split(' ')[1]
}
export const extractRefreshToken = (token: string) => {
    return token?.split('=')[1]
}