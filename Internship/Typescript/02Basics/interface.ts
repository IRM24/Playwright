interface User {
    readonly dbId: number,
    email: string,
    userId: number,
    googleId?: string, //optional property, may or may not be present
    startTrial(): string; //method that returns a string
    getCoupon(couponName: string, value: number): number; //method that takes a string and a number and returns a number
}

interface User{ //reopening the User interface to add more properties
    githubToken?: string; //optional property, may or may not be present
}

const hitesh: User = {
    dbId: 22,
    githubToken: "gh12345",
    email: "hitesh@example.com",
    userId: 1,
    googleId: "12345",
    startTrial: () => {
        return "Trial started";
    },
    getCoupon: (couponName: "Hitesh" | "Hitesh2", value: 10 | 20) => {
        return value + 1; //returns the value plus 1
    }
}