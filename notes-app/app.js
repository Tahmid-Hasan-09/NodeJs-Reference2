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
// const chalk = require('chalk');
// let greenmsg = chalk.green.bold.inverse('Success!!');
// console.log(greenmsg)

/*---------Getting Input From User By Command Line Arguments-------*/
// const command = process.argv[2]

// console.log(process.argv)

// if (command === 'add') {
//     console.log('Adding note!')
// } else if (command === 'remove') {
//     console.log('Removing note!')
// }

/*---------Manipulate Command Line Arguments By 'yargs' package-------*/
const yargs = require('yargs');
yargs.version('1.1.1');
//create add comand
yargs.command({
    command:'add',
    describe:'add a note',
    builder:{
        title:{
            describle:'Note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'Note body',
            demandOption:true,
            type:'string'
        }
    },
    handler:function(argv){
        console.log(`Title:${argv.title}`);
        console.log(`Body:${argv.body}`);
    }
})
//remove add comand
yargs.command({
    command:'remove',
    describe:'remove a note',
    handler:function(){
        console.log('Removing A Note');
    }
})
//create List comand
yargs.command({
    command:'list',
    describe:'List Notes',
    handler:function(){
        console.log('Listing All notes');
    }
})
//create read comand
yargs.command({
    command:'read',
    describe:'read a note',
    handler:function(){
        console.log('Reading A Note');
    }
})
yargs.parse();
//console.log(yargs.argv)