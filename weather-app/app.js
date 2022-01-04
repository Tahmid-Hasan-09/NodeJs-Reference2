//Asynchronous NodeJs Reference Example by Order of Execution
console.log('Starting')

setTimeout(() => {
    console.log('2 Second Timer')
}, 2000)

setTimeout(() => {
    console.log('0 Second Timer')
}, 0)

console.log('Stopping')