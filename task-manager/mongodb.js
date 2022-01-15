// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;
const {MongoClient,ObjectId} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectId();
// console.log(id)
// console.log(id.getTimestamp())
// console.log(id.id.length)
// console.log(id.toHexString().length)

MongoClient.connect(connectionURL, {
    useNewUrlParser: true
}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName);
    const collection = db.collection('users');

    // collection.insertOne({
    //     // _id:id,
    //     name:'Munzir Khan',
    //     age : 27
    // },(error,newUser)=>{
    //     if(error){
    //         return console.log('Unable to connect to database!');
    //     }
    //     console.log(newUser)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, {
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!')
    //     }

    //     console.log(result)
    // })

    // db.collection('tasks').insertMany([{
    //     description: 'Man is Mortal',
    //     completed: true
    // }, {
    //     description: 'The job must have been completed',
    //     completed: false
    // }], (error, newlyInserted) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!');
    //     }
    //     console.log(newlyInserted)
    // })
})