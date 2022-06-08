/**************** Require express basic confic from app.js *************************/
const app = require('./app')

/**************** Set up port ********************/
const port = process.env.PORT

/**************** routes for listening ports *************************/
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
