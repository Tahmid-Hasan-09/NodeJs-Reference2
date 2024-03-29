const fs = require('fs');
const chalk = require('chalk');

const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body) {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter(function (note) {
    //     return note.title === title
    // })
    const duplicateNote = notes.find((note)=>{
        return note.title === title
    })

    if (!duplicateNote) { //if(duplicateNote === undefined)
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = function(title){
    const notes = loadNotes();
    const notesToKeep = notes.filter((note)=>{
        return note.title !== title;
    })
    if(notes.length === notesToKeep.length){
        console.log(chalk.red.inverse('No Note Found!'));
    }else{
        console.log(chalk.green.inverse('Note Removed!'));
        saveNotes(notesToKeep);
    }    
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const listNotes = ()=>{
    console.log(chalk.blue.inverse('Your Notes'));
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(note.title)
    });
}

const readNote = (title)=>{
    const notes = loadNotes();
    const note = notes.find((note)=>{
        return note.title === title;
    });
    if(note !== undefined){
        console.log(`${chalk.inverse(note.title)} : ${note.body}`);
    }else{
        console.log(chalk.red.inverse('Note Not Found!'));
    }    
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes : listNotes,
    readNote : readNote
}