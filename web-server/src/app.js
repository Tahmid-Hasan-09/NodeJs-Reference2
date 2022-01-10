const path = require('path')
const express = require('express')
const app = express();

//Node Provided Variable
console.log(__dirname);
console.log(__filename);

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine','hbs');

//Routes

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

app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Weather',
        name: 'Andrew Mead'
    })
})
 
app.get('/about', (req, res) => {    
    res.render('about', { 
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Please Help!!It\'s an emergency!'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})