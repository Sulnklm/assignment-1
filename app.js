const express = require('express');
const booksRouter = require('./routes/books');
const app = express();
const PORT = 2100;

app.use(express.json()); 
app.use(express.static('public')); 

app.use('/api', booksRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// Handle 404 for all other routes
app.use((req, res) => {
    res.status(404).send('Endpoint not found');
  });
  