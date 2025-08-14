const port = import.meta.env.VITE_BACKEND_URL; 


const loginUserRoute = `${port}/api/v1/users/login`
const registerUserRoute = `${port}/api/v1/users/register`
const logoutRoute = `${port}/api/v1/users/logout`
const positiveRoute = `${port}/api/v1/ai/positive-prompt`


export {
    loginUserRoute,
    registerUserRoute,
    logoutRoute,
    positiveRoute
}