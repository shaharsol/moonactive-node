const allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

let result = ''
for(let i = 0; i < 7; i++) {
    result += allowedChars[Math.floor(Math.random() * allowedChars.length)]
}

console.log(result)