import express from "express";
import cookieParser from "cookie-parser"; 
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // explicitly your frontend URL
  credentials: true,              // allow cookies/headers
}));
app.use(express.json({
    limit: '16kb'
}))
app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
})) 
app.use(express.static('public')) 
app.use(cookieParser())



import userRouter from './routes/user.routes.js';
import entriesRouter from './routes/entry.routes.js';
import aiRouter from './routes/ai.routes.js'

app.use("/api/v1/users", userRouter) 
app.use('/api/v1/entries', entriesRouter)
app.use('/api/v1/ai', aiRouter)


export { app }