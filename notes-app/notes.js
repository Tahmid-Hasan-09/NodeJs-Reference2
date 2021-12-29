const fs = require('fs');

const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body) {
    const notes = loadNotes();
}

const loadNotes = function () {

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote
}