let greetinngs: string = "Ian";
console.log(greetinngs);

let userId: number = 12345;

let isLoggedIn: boolean = true;

//caso de usar un tipo de dato que es muy obvio

let userName = "Ian"; // TypeScript infers this as string
let userAge = 30; // TypeScript infers this as number

//casos mas reales de uso de tipos 

//let hero; // hero is of type 'any' since no type is specified
let hero: string = "Spiderman"; // hero is explicitly typed as string
function getHero() {
  return "Spiderman";
}
hero = getHero(); // hero is reassigned to the return value of getHero, which is also a string

export {}
