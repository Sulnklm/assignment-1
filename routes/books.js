const express = require('express');
const booksRouter = express.Router();

const books = [
    { id: 1, title: 'Spider-Man: No Way Home', author: 'Jon Watts', imageUrl: 'https://example.com/spiderman.jpg', year: 2021 },
    { id: 2, title: 'Batman: The Killing Joke', author: 'Alan Moore', imageUrl: 'https://example.com/batman.jpg', year: 1988 },
    { id: 3, title: 'Wonder Woman: Year One', author: 'Greg Rucka', imageUrl: 'https://example.com/wonderwoman.jpg', year: 2016 },
];

function findBookById(req, res, next) {
    const requestedId = Number(req.params.id);
    const bookData = books.find(bookList => bookList.id === requestedId);
    if (bookData !== undefined) {
        req.book = bookData;
        next();
    } else {
        res.status(404).send('Book not found');
    }
}

// Get all books
booksRouter.get('/', (req, res) => {
    res.send(books);
});

// Get a book by id
booksRouter.get('/:id', findBookById, (req, res) => {
    res.send(req.book);
});

// Add a new book via POST
booksRouter.post('/', (req, res) => {
    const { title, author, imageUrl, year } = req.body;
    const book = { id: books.length + 1, title, author, imageUrl, year };
    books.push(book);
    res.status(201).send(book);
});

// Update an existing book via id
booksRouter.put('/:id', findBookById, (req, res) => {
    const { title, author, imageUrl, year } = req.body;
    const book = req.book;
    book.title = title || book.title;
    book.author = author || book.author;
    book.imageUrl = imageUrl || book.imageUrl;
    book.year = year || book.year;
    res.status(200).json(book);
});

// Delete a book by id
booksRouter.delete('/:id', findBookById, (req, res) => {
    const index = books.indexOf(req.book);
    books.splice(index, 1);
    res.status(204).send('Book deleted');
});

module.exports = booksRouter;
