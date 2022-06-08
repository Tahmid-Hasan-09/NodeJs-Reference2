/*******************Simple Testing Demo Technique
test('Hello world!', () => {

})

test('This should fail', () => {
    throw new Error('Failure!')
})
**************************************/

//Require functions from another file
const {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add
} = require('../playground/math_func_for_test')

//Normal Function Testing
test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)

    // if(total !== 13){
    //     throw new Error(`Total Tip should be 
    //                         13. Got ${total}`)
    // }
})

//Normal Function with default argument value testing
test('Should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

/**************Normal function of converting      celcius/farenheit testing ************/
test('Should convert 32 F to 0 C', () => {
    const temp = fahrenheitToCelsius(32)
    expect(temp).toBe(0)
})
test('Should convert 0 C to 32 F', () => {
    const temp = celsiusToFahrenheit(0)
    expect(temp).toBe(32)
})

/************** Asynchronous function Testing ************/
// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

test('Should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two numbers async/await', async () => {
    const sum = await add(10, 22)
    expect(sum).toBe(32)  
})










// 
// Why test?
// 
// - Saves time
// - Creates reliable software
// - Gives flexibility to developers
//   - Refactoring
//   - Collaborating
//   - Profiling
// - Peace of mind