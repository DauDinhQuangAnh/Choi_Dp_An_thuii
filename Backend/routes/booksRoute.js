import express from "express";
import { Book } from '../models/BookModel.js';


const router = express.Router();

//Save a new Book
router.post('/', async (req, res) => {  //http://localhost:5555/book bắt đầu test
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
router.get('/', async (req, res) => {  //http://localhost:5555/book bắt đầu test
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
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json({ book });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


// update a book by id
router.put('/:id', async (req, res) => {  //http://localhost:5555/book bắt đầu test
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

//delete a book by id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({ message: 'Book not found' });
        }
        return res.status(200).send({ message: 'Book deleted successfully' });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }

});

export default router;