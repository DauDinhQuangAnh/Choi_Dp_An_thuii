import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/BookModel.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req)
    return res.send('Welcome')
});


//Save a new Book

app.post('/books', async (req, res) => {  //http://localhost:5555/book bắt đầu test
    try {
        if (                                   // Bắt đầu duyệt qua 3 phần title,author,publisherYear
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(404).send({                         // nếu có phần nào trống thì phần này sẽ được hiện ra 
                message: 'Send all required fields',
            });
        }
        const newBook = {                                //Còn Không thì code này sẽ chạy
            title: req.body.title,                         // add thêm cuỗn sách mới
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newBook);
        return res.status(200).send(book);
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
});


//Get all Book

app.get('/books', async (req, res) => {  //http://localhost:5555/book bắt đầu test
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
});


//get 1 book by id

app.get('/books:id', async (req, res) => {  //http://localhost:5555/book bắt đầu test
    try {

        const { id } = req.params;

        const book = await Book.find({});

        return res.status(200).json({ book });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
});

app.put('/books/:id', async (req, res) => {  //http://localhost:5555/book bắt đầu test
    try {
        if (                                   // Bắt đầu duyệt qua 3 phần title,author,publisherYear
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(404).send({                         // nếu có phần nào trống thì phần này sẽ được hiện ra 
                message: 'Send all required fields',
            });
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).send({ message: 'Book successfully' });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
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