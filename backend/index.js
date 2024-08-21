import express, { request, response } from 'express';
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Exercise } from './models/exerciseModel.js';
import exerciseRoute from './routes/exerciseRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());
//app.use(
//    cors({
//        origin: 'http://localhost:3000',
//        methods: ['GET', 'POST', 'PUT', 'DELETE'],
//        allowedHeaders: ['Content-Type'],
//    })
//)

app.use(cors());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('testing code?')
});

app.use('/exercises', exerciseRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });