enum SeatChoice { //la diferencia entre un enum y un tipo es que un enum es un conjunto de valores predefinidos, mientras que un tipo es una definicion de un tipo de dato y la diferencia entre un enum y un objeto es que un enum es un conjunto de valores predefinidos, mientras que un objeto es una instancia de una clase o una estructura de datos que puede contener propiedades y métodos.
    AISLE = 'Aisle',
    MIDDLE = 'Middle',
    WINDOW = 'Window'
}   

const seat = SeatChoice.AISLE; // seat is of type SeatChoice and can only be one of the enum values
