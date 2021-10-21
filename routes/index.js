const express = require('express');

// Import modular routers for /notes
const notesRouter = require('./notes');

const app = express();

// routing to notes when user wants to write a note
app.use('/notes', notesRouter);

module.exports = app;