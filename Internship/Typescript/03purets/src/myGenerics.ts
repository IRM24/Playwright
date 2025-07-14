const score: Array<number> = [];
const names: Array<string> = [];

function identityOne(val: boolean | number): boolean | number {
    return val;
}

function identityTwo(val: any): any {
    return val;
}

function identityThree<Type>(val: Type): Type { // Usando generics para definir un tipo que se puede usar en lugar de any. 
    return val;
}

identityThree<string>("Ian");
identityThree<number>(23);
identityThree<boolean>(true);

function identityFour<T>(val: T): T {
    return val;
}
// Esta función es genérica y puede aceptar cualquier tipo de dato, pero el tipo debe ser el mismo para el argumento y el retorno

interface Bottle {
    brand: string;
    type: string;
    capacity: number;
}

identityFour<Bottle>({
    brand: "Coca Cola",
    type: "Soda",
    capacity: 500
});
