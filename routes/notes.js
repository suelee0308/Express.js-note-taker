const notes = require('express').Router();

notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    res.send('NOTES HERE');
});



module.exports = notes;