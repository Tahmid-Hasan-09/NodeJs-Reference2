const path = require('path')
const express = require('express')
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Node Provided Variable
console.log(__dirname);
console.log(__filename);

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);

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
        name: 'Tahmid Hasan'
    }) 
})

app.get('/help',(req,res)=>{ 
    res.render('help',{
        message:'Please Help!!It\'s an emergency!',
        title: 'Help title',
        name: 'Tahmid Hasan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide a search term'
        })
    }

    geocode(req.query.address,(error,data)=>{ //geocode(req.query.address, (error, {longitude,latitude,place} = {}) => {
        if(error){
            return res.send({error});
        }
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                forecast:forecastData,
                location:data.place,
                address:req.query.address
            })
        })
    }) 
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Tahmid Hasan',
        errorMessage:'Help Article Not Found'
    })
})
 
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Tahmid Hasan',
        errorMessage:'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})