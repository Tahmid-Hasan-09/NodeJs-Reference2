const jwt = require('jsonwebtoken');

const myfunction = async ()=>{
    const token = jwt.sign({_id:'abc123'}, 'thisismynewcourse',{expiresIn:'7 days'});
    console.log(token)

    const data = jwt.verify(token,'thisismynewcourse')
    console.log(data)
}
myfunction();