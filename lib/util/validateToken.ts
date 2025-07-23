export function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        // console.log("Payload: ", payload)
        // console.log("Current Time: ", currentTime)
        return payload.exp < currentTime;
    } catch (error) {
        console.error('Error parsing token:', error);
        return true;
    }
}

export function isValidJWT(token: string): boolean {
    return !!token && token.split('.').length === 3;
}