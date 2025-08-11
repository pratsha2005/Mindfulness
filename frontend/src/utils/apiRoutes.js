const port = import.meta.env.VITE_BACKEND_URL; 

const loginUserRoute = `${port}/api/v1/users/login`
const registerUserRoute = `${port}/api/v1/users/register`
const logoutRoute = `${port}/api/v1/users/logout`

export {
    loginUserRoute,
    registerUserRoute,
    logoutRoute
}