import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
    console.log(req)
    return res.send('Welcome')
});
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);

        });
    })
    .catch((error) => {
        console.log('Failed to connect');
    });