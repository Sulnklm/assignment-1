const express = require('express');
const router = express.Router();

// Initial list of books
const books = [
  {
    id: 1,
    title: 'Spider-Man: No Way Home',
    author: 'Jon Watts',
    imageUrl: '/assets/Spider-Man.jpg',
    year: 2021,
  },
  {
    id: 2,
    title: 'Batman: The Killing Joke',
    author: 'Alan Moore',
    imageUrl: '/assets/Batman.jpg',
    year: 1988,
  },
  {
    id: 3,
    title: 'Wonder Woman: Year One',
    author: 'Greg Rucka',
    imageUrl: '/assets/Wonder-Woman.jpg',
    year: 2016,
  },
];

// Middleware to find a book by ID
function findBookById(req, res, next) {
  const requestedId = Number(req.params.id);
  const bookData = books.find((book) => book.id === requestedId);
  if (bookData) {
    req.book = bookData;
    next();
  } else {
    res.status(404).send('Book not found');
  }
}

// Get all books
router.get('/books', (req, res) => {
  res.json(books);
});

// Get a book by ID
router.get('/books/:id', findBookById, (req, res) => {
  res.json(req.book);
});

// Add a new book
router.post('/books', (req, res) => {
  const { title, author, imageUrl, year } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    imageUrl,
    year,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book
router.put('/books/:id', findBookById, (req, res) => {
  const { title, author, imageUrl, year } = req.body;
  req.book.title = title || req.book.title;
  req.book.author = author || req.book.author;
  req.book.imageUrl = imageUrl || req.book.imageUrl;
  req.book.year = year || req.book.year;
  res.status(200).json(req.book);
});

// Delete a book
router.delete('/books/:id', findBookById, (req, res) => {
  const index = books.indexOf(req.book);
  books.splice(index, 1);
  res.status(204).send('Book deleted');
});

module.exports = router;
