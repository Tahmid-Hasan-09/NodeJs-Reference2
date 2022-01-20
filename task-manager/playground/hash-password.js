const bcrypt = require('bcryptjs');
 

const hashedPassword =async ()=>{    
    const password = 'tahmid123!';
    const hashedPassword = await bcrypt.hash(password,8);

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('tahmid123!',hashedPassword);
    console.log(isMatch)
}
hashedPassword();