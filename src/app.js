import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// routes import 
import userRouter from './routes/userRouter.js';

// routes declaration
app.use('/users', userRouter);

export default app ;

// import express from "express";
// import router from "./routes/userRouter.js";

// const app = express();

// app.use(express.json());

// // mount routes
// app.use("/users", router);

// export default app;
