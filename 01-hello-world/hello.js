// const myName = process.argv[2]
// console.log('hello ' + myName)
const myName = process.env.MY_NAME || 'moshe'
console.log(`hello ${myName}`)
