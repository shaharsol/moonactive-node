const codeGenerator = (allowSpecialChars, length) => {
    const specialChars = '!@#$%^&*()'
    let allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    if (allowSpecialChars) allowedChars += specialChars

    let result = ''
    for(let i = 0; i < length; i++) {
        result += allowedChars[Math.floor(Math.random() * allowedChars.length)]
    }
    
    return result
}

module.exports = codeGenerator
