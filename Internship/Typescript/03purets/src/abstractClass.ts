abstract class TakePhoto { //ventaja de las clases abstractas es que no se pueden instanciar, solo se pueden extender
    // Se pueden definir propiedades y métodos abstractos que deben ser implementados en las clases hijas, pero tambien se puede definir logica de metodos en las clases abstractas
    // Se pueden definir propiedades y metodos que no son abstractos, pero las clases hijas deben implementar los metodos abstractos
    cameraMode: string;
    filter: string;
    burst: number;

    constructor(cameraMode: string, filter: string, burst: number) {
        this.cameraMode = cameraMode;
        this.filter = filter;
        this.burst = burst;
    }

    takePhoto(): void { // Este método no es abstracto, por lo que puede tener una implementación por defecto
        // Este método puede ser llamado por las clases hijas, pero no es obligatorio que lo implementen
        // Las clases hijas pueden sobreescribir este método si lo desean
        console.log(`Taking photo in ${this.cameraMode} mode with ${this.filter} filter and burst of ${this.burst}`);
    }

    abstract getSepia(): void;
}

class Instagram extends TakePhoto {
    createStory(): void {   
        console.log("Creating a story on Instagram");
    }

    getSepia(): void {
        console.log("Applying sepia filter on Instagram");
    
    }
}

const Ian = new Instagram("portrait", "sepia", 3); //los objetos de la clase abstracta no se pueden instanciar, pero si se pueden instanciar las clases hijas
Ian.getSepia();
Ian.takePhoto();
Ian.createStory();

