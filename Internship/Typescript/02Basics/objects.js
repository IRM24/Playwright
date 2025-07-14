"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = {
    name: "John",
    age: 30,
    isAdmin: true,
    greet: function () {
        console.log("Hello, my name is ".concat(this.name));
    }
};
/*function createUser({name: string, isPaid: boolean}){
}*/
var newUser = {
    name: "Jane",
    isPaid: false,
    email: "jane@example.com"
};
//createUser(newUser); // This will work because newUser has the required properties
//createUser({name: "Alice", isPaid: true});
function createCourse() {
    return { name: "TypeScript Course", price: 299 };
}
/*function createUser(user: User): User { //function that expects an object of type User
    return user;
}*/
var myUser = {
    id: "123",
    name: "John Doe",
    email: "john.doe@example.com",
    isActive: true
};
myUser.email = "john.new@example.com";
