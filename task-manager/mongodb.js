const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
MongoClient.connect(connectionURL, {
    useNewUrlParser: true
}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName);
    const collection = db.collection('users');

    // collection.insertOne({
    //     name:'Tahmid Hasan',
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

    db.collection('tasks').insertMany([{
        description: 'Man is Mortal',
        completed: true
    }, {
        description: 'The job must have been completed',
        completed: false
    }], (error, newlyInserted) => {
        if (error) {
            return console.log('Unable to insert documents!');
        }
        console.log(newlyInserted)
    })
})