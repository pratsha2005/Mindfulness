const port = import.meta.env.VITE_BACKEND_URL; 


const loginUserRoute = `${port}/api/v1/users/login`
const registerUserRoute = `${port}/api/v1/users/register`
const logoutRoute = `${port}/api/v1/users/logout`
const positiveRoute = `${port}/api/v1/ai/positive-prompt`
const addEntryRoute = `${port}/api/v1/entries/create-entry`
const getAllEntriesRoute = `${port}/api/v1/entries/get-all-entries`
const getWeeklyAnalyticsRoute = `${port}/api/v1/entries/get-weekly-analytics`
const analysisRoute = `${port}/api/v1/ai/ai-insights`

export {
    loginUserRoute,
    registerUserRoute,
    logoutRoute,
    positiveRoute,
    addEntryRoute,
    getAllEntriesRoute,
    getWeeklyAnalyticsRoute,
    analysisRoute
}