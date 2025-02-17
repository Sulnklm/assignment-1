// Import the express module to create a router
const express = require('express');
// Create a new router instance
const router = express.Router();

// Initial list of books with sample data
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

// Middleware to find a book by its ID
function findBookById(req, res, next) {
  const requestedId = Number(req.params.id); // Get the ID from the request parameters
  const bookData = books.find((book) => book.id === requestedId); // Search for the book in the array
  if (bookData) {
    req.book = bookData; // If found, attach it to the request object
    next(); // Proceed to the next middleware/route handler
  } else {
    res.status(404).send('Book not found'); // If not found, send a 404 error
  }
}

// GET route to retrieve all books
router.get('/books', (req, res) => {
  res.json(books); // Return the books array as JSON
});

// GET route to retrieve a specific book by its ID
router.get('/books/:id', findBookById, (req, res) => {
  res.json(req.book); // Return the book attached to the request object
});

// POST route to add a new book to the list
router.post('/books', (req, res) => {
  const { title, author, imageUrl, year } = req.body; // Destructure the new book data from the request body
  const newBook = {
    id: books.length + 1, // Generate a new ID by adding 1 to the length of the array
    title,
    author,
    imageUrl,
    year,
  };
  books.push(newBook); // Add the new book to the books array
  res.status(201).json(newBook); // Respond with the new book and a 201 status code
});

// PUT route to update an existing book by its ID
router.put('/books/:id', findBookById, (req, res) => {
  const { title, author, imageUrl, year } = req.body; // Get the updated data from the request body
  req.book.title = title || req.book.title; // Update the book's properties if provided
  req.book.author = author || req.book.author;
  req.book.imageUrl = imageUrl || req.book.imageUrl;
  req.book.year = year || req.book.year;
  res.status(200).json(req.book); // Return the updated book with a 200 status code
});

// DELETE route to delete a specific book by its ID
router.delete('/books/:id', findBookById, (req, res) => {
  const index = books.indexOf(req.book); // Find the index of the book to delete
  books.splice(index, 1); // Remove the book from the array
  res.status(204).send('Book deleted'); // Respond with a 204 status code (no content)
});

// Export the router so it can be used in app.js
module.exports = router;
