const pet = {
    name : 'Hal'
}

//It's gonna get called whenever that object get stringified(converted to json format)
pet.toJSON = function(){
    return 'If Converting JSON then object responded from here'
}

console.log(JSON.stringify(pet)) //res.send() use this behind background