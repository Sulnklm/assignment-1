// Import the Express module
const express = require('express');
// Import the books.js router for handling book-related routes
const booksRouter = require('./routes/books');

// Create an Express application instance
const app = express();

// Set the port for the server to listen on (Port 2100)
const PORT = 2100;

// Use middleware to parse incoming JSON request bodies
app.use(express.json()); 

// Serve static files (like images) from the "public" directory
app.use(express.static('public')); 

// Use the booksRouter for handling all routes starting with '/api'
app.use('/api', booksRouter);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// Handle 404 errors for any undefined routes
app.use((req, res) => {
    res.status(404).send('Endpoint not found');
});
