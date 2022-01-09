const path = require('path')
const express = require('express')
const app = express()

//Node Provided Variable
console.log(__dirname);
console.log(__filename);

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath));

/*
app.get('', (req, res) => {
    res.send('Hello express!')
})

app.get('/help', (req, res) => {
    res.send('Help page')
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.get('/weather', (req, res) => {
    res.send('Your weather')
})
*/

/*
app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/help', (req, res) => {
    res.send([{
        name: 'Andrew'
    }, {
        name: 'Sarah'
    }])
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})

*/

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})