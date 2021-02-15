import express from 'express';
import { connect } from './database';
import Books from './models/bookModel';
const server = express();
const PORT = 5000;

connect();

server.get('/books', async (req, res) => {
    try {
        const books = await Books.find({})
        return res.json(books);
    } catch (e) {
        console.error(e);
        return res.status(500).send(e);
    }
})

server.listen(PORT, () => {
    'listening!!'
})