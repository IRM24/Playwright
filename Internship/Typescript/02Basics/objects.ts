const User = {
    name: "John",
    age: 30,
    isAdmin: true,
    greet: function() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

/*function createUser({name: string, isPaid: boolean}){
}*/

let newUser = {
    name: "Jane",
    isPaid: false,
    email: "jane@example.com"
};

//createUser(newUser); // This will work because newUser has the required properties

//createUser({name: "Alice", isPaid: true});

function createCourse():{name: string, price: number}{ //function that returns an object and expects a object with specific properties name and price
    return {name: "TypeScript Course", price: 299}
}

type User = { //la utilización de type permite definir un tipo de dato que puede ser reutilizado
    readonly id: string; //readonly property, cannot be changed after initialization
    name: string;   
    email: string;
    isActive: boolean;
    creditCardDetails?: number; //optional property, may or may not be present
}

/*function createUser(user: User): User { //function that expects an object of type User
    return user;
}*/

let myUser: User = { //al crear un objeto de tipo User, se debe cumplir con las propiedades definidas en el tipo
    id: "123",
    name: "John Doe",
    email: "john.doe@example.com",
    isActive: true
}

myUser.email = "john.new@example.com";
//myUser.id = "456"; // This will cause an error because id is readonly

type cardNumber = {
    cardNumber: string;
}

type cardDate = {
    cardDate: string;
}

type cardDetails = cardNumber & cardDate & {
    cvv: number; //intersection type, combines properties from both types
    cardHolderName: string; //additional properties can be added    
} //intersection type, combines properties from both types      



export{}