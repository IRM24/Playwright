//const user : string[] = ['John', 'Doe', 'Jane']; // user is an array of strings
const user : [string, number, boolean] = ['John', 25, true]; // user is a tuple with a string, number, and boolean. Tuples are fixed-length arrays with specific types for each index.
type userType = [string, number, boolean]; // userType is a type alias for a tuple with a string, number, and boolean
const newUser: userType = ['Jane', 30, false]; // newUser is a tuple of the same type as userType
newUser[0] = 'Doe'; // This is valid, as the first element is a string

