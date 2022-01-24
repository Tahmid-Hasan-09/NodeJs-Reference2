const pet = {
    name : 'Hal'
}
pet.toJSON = function(){
    return 'If Converting JSON then object responded from here'
}

console.log(JSON.stringify(pet))