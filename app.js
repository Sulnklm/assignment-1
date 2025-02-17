const express = require('express');
const app = express();
const PORT = 3200;
const bodyParser = require('body-parser');
const booksRouter = require('./routes/books');

app.use(bodyParser.json());

app.use('/api', booksRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
});