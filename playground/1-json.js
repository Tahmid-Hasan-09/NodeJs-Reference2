const fs = require('fs');
/* 
//Sample Obj Create
const book = {
    title:'Ego is the Enemy',
    author:'Ryan Holiday'
}

//Convert Obj to JSON
const bookJSON = JSON.stringify(book);

//Write To json file using fs package
fs.writeFileSync('1-json.json',bookJSON);

//Read json file using fs package
const dataBuffer = fs.readFileSync('1-json.json');

//Convert Buffer Data To Original Json Data
const dataJson = dataBuffer.toString();

//Convert JSON to Obj
const data = JSON.parse(dataJson)

// console.log(dataBuffer)
// console.log(dataJson)
console.log(data.title)
*/

const dataBuffer = fs.readFileSync('1-json.json');
const dataJson = dataBuffer.toString();
const user = JSON.parse(dataJson);
user.name = 'Gunther';
user.age = 54;
const userJson = JSON.stringify(user);
fs.writeFileSync('1-json.json',userJson);