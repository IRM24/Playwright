const superHeroes: string[] = [] //superHeroes is an array of strings
const heroPowers: number[] = [] //heroPowers is an array of numbers
const heroPower: Array<number> = [] //heroPower is also an array of numbers, using a different syntax

superHeroes.push('Batman')
heroPowers.push(100)

type User = {
    name: string;
    isActive: boolean;
}

const allUsers: User[] = [] //allUsers is an array of User objects
allUsers.push({ name: 'Ian', isActive: true }) //pushing a User object into the allUsers array following the structure defined by the User type