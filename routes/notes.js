const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require("short-unique-id")

// from the npm package short-unique-id
const uid = new uuid ({ length: 6 });

// GET route that reads the current db.json
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data))
  );
});

// POST Route for a error logging, uses readAndAppend function to append newNote to db.json
notes.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    // if user inputs title and text into front end
    if ( title && text) {
    // create newNote object with random id
    const newNote = {
        title, 
        text, 
        id: uid()
    };
    readAndAppend(newNote, './db/db.json');
    res.json('Note Added!');

  } else {
    res.error('Error in adding note');
  }
});

// DELETE route when specific note's id is passed
notes.delete('/:id', (req, res) => {
  // grab id from request's param
    const noteId = req.params.id;
  // read current db file, then parse, then take take json and run rest of function
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted`);
    });
})

module.exports = notes;