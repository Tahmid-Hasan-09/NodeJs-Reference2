const fs = require('fs');
const getNotes = require('./notes');

const msg = getNotes();
console.log(msg);

fs.writeFileSync('notes.txt', 'My name is Tahmid.');

fs.appendFileSync('notes.txt','I am 25 years old');


