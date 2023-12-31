import express, { response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send("Welcome")
});


app.post('/books', async (request, response) => {
    try{
        if (!request.body.title || !request.body.title || !request.body.publishYear){
            return  response.status(400);
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);

        return response.status(201).send(book);
    }catch(error){
        console.log(error);
        response.status(500).send({ message: error.message});
    }
});


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(PORT, () => {
            console.log("App is started");
        })
    })
    .catch((error) => {
        console.log(error)
    });