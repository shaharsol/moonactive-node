setTimeout(() => {
    console.log('1 milisec passed....')
}, 1)

console.log('start looping')
let y = 0;
for(let i=0; i < 10000000000; i++) {
    // do nothing
    y++
}
console.log('end looping')
