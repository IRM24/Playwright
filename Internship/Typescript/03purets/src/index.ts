/*class User {
    name: string;
    age: number;
    private readonly city: string;
    constructor(name: string, age: number, city: string) {

        this.name = name;
        this.age = age;
        this.city = city;
    }
    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

const Ian = new User("Ian", 30, "Alajuela");
Ian.greet();
//Ian.city = "San Jose"; // Changing the city property
*/

//declarando una clase de forma mas profesional

class User {

    protected courseCount: number = 0;

    readonly city: string = "Alajuela";
    constructor(public name: string, public age: number) {
        //this.city = city; // No es necesario asignar city aquí porque ya está inicializado
    }

    get getAppleEmail(): string {

        return `${this.name.toLowerCase().replace(" ", ".")}@apple.com`;
    }

    get getCourseCount(): number {
        return this.courseCount;
    }

    set setCourseCount(courseNum: number) {
        if (courseNum <= 0) {
            throw new Error("Course count should be positive");
        }
        this.courseCount = courseNum;
    }

    private deleteToken() {
        console.log("Token deleted");
    }
}

class SubUser extends User {
    isFamily: boolean = true;

    changeCourseCount() {
        this.setCourseCount = 4; // Usando el setter
        console.log(this.getCourseCount); // Usando el getter
    }

    showCity() {
        console.log(this.city); // Accediendo a la propiedad readonly
    }
}
