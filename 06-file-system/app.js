const fileSystem = require('fs')

// const readFilePromise = (path, encoding) => {
//     return new Promise((resolve, reject) => {
//         fileSystem.readFile(path, encoding, (err, data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(data)
//             }
//         })
//     })
// }

const promisify = (func) => {}


const readFilePromise = promisify(fileSystem.readFile)

// IIFE - imediately invoked function execution
(async () => {
    const indexData = await readFilePromise('./index.txt', 'utf-8')
    const index2Data = await readFilePromise(indexData, 'utf-8')
    const index3Data = await readFilePromise(index2Data, 'utf-8')
    console.log(index3Data)
})()

// main()
console.log('started...')

// fileSystem.readFile('./index.txt', 'utf-8', (err, data) => {
//     fileSystem.readFile(data, 'utf-8', (err, data) => {
//         fileSystem.readFile(data, 'utf-8', (err, data) => {
//             console.log(data)
//         })
//     })
// })

