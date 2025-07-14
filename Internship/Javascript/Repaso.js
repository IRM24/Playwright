//cosnt and variables
let nombre = "Juan";
let edad = 30;
const PI = 3.14159;
let newEdade = edad + 5;

//Strings
let saludo = "Hola, " + nombre + ". Tienes " + edad + " años.";
const otroNombre = "Pedrito";
otroNombre[0] = "p"; //Indices
otroNombre.length; //Longitud de la cadena

//Template Literals
let saludoTemplate = `Hola, ${nombre}. Tienes ${edad} años.`;

//Comparaciones
let esMayor = edad > 18; // Mayor que
let esMenor = edad < 18; // Menor que   
let esIgual = edad === 30; // Igual a
let esDiferente = edad !== 30; // Diferente de
let esMayorOIgual = edad >= 30; // Mayor o igual que
let esMenorOIgual = edad <= 30; // Menor o igual que            

//Operadores lógicos
let esVerdadero = true;
let esFalso = false;
let resultadoAnd = esVerdadero && esFalso; // AND lógico
let resultadoOr = esVerdadero || esFalso; // OR lógico
let resultadoNot = !esVerdadero; // NOT lógico

//Condicionales
if (edad >= 18) {
    console.log("Eres mayor de edad.");
}   else {
    console.log("Eres menor de edad.");
}

//Switch
let dia = 3;

switch (dia) {
    case 1:
        console.log("Lunes");
        break;
    case 2:
        console.log("Martes");
        break;
    case 3:
        console.log("Miércoles");
        break;
    default:
        console.log("Día inválido");
}

//Bucles
for (let i = 0; i < 5; i++) {
    console.log("Número: " + i);
}

//While
let contador = 0;
while (contador < 5) {
    console.log("Contador: " + contador);
    contador++;
}

//arrays
let frutas = ["Manzana", "Banana", "Naranja"];
frutas.push("Pera"); // Añadir un elemento
frutas.pop(); // Eliminar el último elemento
frutas[0]; // Acceder al primer elemento
frutas.length; // Longitud del array

//Objetos
let persona = {
    nombre: "Juan",
    edad: 30,
    ciudad: "Madrid"
};
persona.nombre; // Acceder a la propiedad nombre
persona["edad"]; // Acceder a la propiedad edad     
persona.apellido = "Pérez"; // Añadir una nueva propiedad
delete persona.ciudad; // Eliminar una propiedad

//Funciones
function saludar(nombre) {
    return `Hola, ${nombre}!`;
}

function sumar(a, b) {
    return a + b;
}

// Función anónima
let multiplicar = function(a, b) {
    return a * b;
};  

// Función flecha
let dividir = (a, b) => {
    return a / b;
};

let dividir2 = (a, b) => a / b;