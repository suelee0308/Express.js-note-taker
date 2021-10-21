const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require("short-unique-id")

// from the npm package short-unique-id
const uid = new uuid ({ length: 6 });


notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data))
  );
});

// POST Route for a error logging
notes.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;

    if ( title && text) {
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


notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
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