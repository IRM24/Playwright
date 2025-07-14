"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var greetinngs = "Ian";
console.log(greetinngs);
var userId = 12345;
var isLoggedIn = true;
//caso de usar un tipo de dato que es muy obvio
var userName = "Ian"; // TypeScript infers this as string
var userAge = 30; // TypeScript infers this as number
//casos mas reales de uso de tipos 
//let hero; // hero is of type 'any' since no type is specified
var hero = "Spiderman"; // hero is explicitly typed as string
function getHero() {
    return "Spiderman";
}
hero = getHero(); // hero is reassigned to the return value of getHero, which is also a string
