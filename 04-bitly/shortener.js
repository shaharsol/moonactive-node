const codeGenerator = (length) => {
    const allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

    let result = ''
    for(let i = 0; i < length; i++) {
        result += allowedChars[Math.floor(Math.random() * allowedChars.length)]
    }
    
    return result
}

module.exports = codeGenerator
