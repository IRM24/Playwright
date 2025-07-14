function addTwo(num: number): number {
    return num + 2;
}
addTwo(5); // 7

function getUpper(val: string): string {
    return val.toUpperCase();
}

getUpper("hello"); // "HELLO"

function signUpUser(name: string, email: string, isPaid: boolean = false){
    // Default value for isPaid is false
    console.log(`Name: ${name}, Email: ${email}, Paid: ${isPaid}`);
}

let loginUser = (name: string, email: string, isPaid: boolean = true) => {
    // Arrow function with default value for isPaid
    console.log(`Name: ${name}, Email: ${email}, Paid: ${isPaid}`);
}

function getValue(myVal:number): number | string {
    // Function that can return either a number or a string
    if (myVal > 5) {
        return "Greater than 5";
    }
    return myVal;
}

const getHello = (s: string): string => {
    // Arrow function that returns a string
    return `Hello, ${s}`;
}

const heros = ["thor", "spiderman", "ironman"];

heros.map(hero => { //inferred as string from heros context
    return `Hero is ${hero}`;
})

heros.map((hero): string => { //better to explicitly type the return value
    return `Hero is ${hero}`;
})

function consoleError(errmsg: string): void { //no return type specified, so it defaults to void
    // Function that logs an error message
    // Function that does not return anything
    console.log(errmsg);
}

function handleError(errmsg: string): never {
    // Function that never returns (e.g., throws an error)
    throw new Error(errmsg);
}

export{}