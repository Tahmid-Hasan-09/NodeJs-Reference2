const fs = require('fs');

fs.writeFileSync('notes.txt', 'My name is Tahmid.');

fs.appendFileSync('notes.txt','I am 25 years old');


