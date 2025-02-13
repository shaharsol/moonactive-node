export const myName = 'art'

function getName() {
    return myName
}

export function doSoemthing() {
    console.log('doing something')
}

export interface Person {
    id: number,
    name: string
}

export const person: Person = {
    id: 1,
    name: 'Art'
}

export default getName






