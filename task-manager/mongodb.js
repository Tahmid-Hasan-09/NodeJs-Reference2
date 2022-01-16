/***************** Setup MongoDB *********************/
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;
const {MongoClient,ObjectId} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

/***************** Generating ObjectId manually *********************/
// const id = new ObjectId();
// console.log(id)
// console.log(id.getTimestamp())
// console.log(id.id.length)
// console.log(id.toHexString().length)

/***************** MongoDB connection Setup Using MongoClient *********************/
MongoClient.connect(connectionURL, {
    useNewUrlParser: true
}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    /***************** Database Create *********************/
    const db = client.db(databaseName);
    /***************** Create Collection/Table *********************/
    const collection = db.collection('users');

    /***************** Inserting One *********************/
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

    /***************** Inserting Many *********************/
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

    /***************** Inserting Many *********************/
    // db.collection('tasks').insertMany([{
    //     description: 'Man is Mortal',
    //     completed: true
    // }, {
    //     description: 'The job must have been completed',
    //     completed: false
    // },{
    //     description: 'Clean the house',
    //     completed: true
    // },{
    //     description: 'Renew inspection',
    //     completed: false
    // },{
    //     description: 'Pot plants',
    //     completed: false
    // }], (error, newlyInserted) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!');
    //     }
    //     console.log(newlyInserted)
    // })

    /***************** Finding Documents Using findOne *********************/
    // db.collection('users').findOne({ _id: new ObjectId("61e043ab032fd65f4304f444") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    /***************** Finding Documents Using find *********************/
    // db.collection('users').find({ age: 27 }).toArray((error, users) => {
    //     console.log(users)
    // })

    /***************** Finding Documents Using findOne *********************/
    // db.collection('tasks').findOne({_id: new ObjectId('61e10ef5d46a458f0b294ff4')},
    // (error,task)=>{
    //     console.log(task)
    // })
    
    /***************** Finding Documents Using find *********************/
    // db.collection('tasks').find({completed:false}).toArray((error,tasks)=>{
    //     console.log(tasks)
    // })

    /***************** Updating Documents Using updateOne *********************/
    // db.collection('users').updateOne({
    //     _id: new ObjectID("5c0fe6634362c1fb75b9d6b5")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    /***************** Updating Documents Using updateMany *********************/
    // db.collection('tasks').updateMany({completed:false},
    //     {
    //         $set:{completed:true}
    //     }).then((task=>{
    //         console.log(task);
    //     })).catch((error)=>{
    //         console.log(error)
    //     })

    /***************** Deleting Documents Using deleteMany *********************/
    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    /***************** Deleting Documents Using deleteOne *********************/
    // db.collection('tasks').deleteOne({
    //     description:'Man is Mortal'
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error)
    // })
})