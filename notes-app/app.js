/*---------Importing Own Files-------*/

/*
const add = require('./utils');
const summation = add(4,-2);
console.log(summation);
*/


/*
const name = require('./utils');
console.log(name);
*/

/*
const fs = require('fs');
const getNotes = require('./notes');
const msg = getNotes();
console.log(msg);
fs.writeFileSync('notes.txt', 'My name is Tahmid.');
fs.appendFileSync('notes.txt','I am 25 years old');
*/

/*---------Importing NPM Package-------*/
const chalk = require('chalk');
let greenmsg = chalk.green.bold.inverse('Success!!');
console.log(greenmsg)