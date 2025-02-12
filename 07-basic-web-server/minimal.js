require('http')
    .createServer((req, res) => res.end('hello from server...'))
    .listen(3000, () => console.log('server started...'));