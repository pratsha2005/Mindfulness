import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path: './.env'
})

// backend wake 
import { app } from "./app.js"
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`App is listening on port ${process.env.PORT || 8000}`)
    })
})
.catch((err) => {
    console.error("Mongo DB connection failed !!!", err)
})