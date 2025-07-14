let score: number | string = 33; // score can be either a number or a string
score = "Thirty-three";

type user = {
    name: string;
    id: number;
};

type Admin = {
    userName: string;
    id: number;
};

let Ian: user | Admin = {
    name: "Ian",
    id: 123
};

Ian = {
    userName: "IanAdmin",
    id: 456
};

function getDbId(id: number | string) {
    // Do something with id
    console.log(`DB ID is: ${id}`);
}

getDbId(101); // Passing a number
getDbId("202"); // Passing a string 

const data: (number | string)[] = [1, "two", 3, "four"];    
// data can contain both numbers and strings

let seatAllotment: "aisle" | "middle" | "window";
// seatAllotment can only be one of the specified string literals
