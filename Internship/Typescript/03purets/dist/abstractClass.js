"use strict";
class TakePhoto {
    constructor(cameraMode, filter, burst) {
        this.cameraMode = cameraMode;
        this.filter = filter;
        this.burst = burst;
    }
    takePhoto() {
        // Este método puede ser llamado por las clases hijas, pero no es obligatorio que lo implementen
        // Las clases hijas pueden sobreescribir este método si lo desean
        console.log(`Taking photo in ${this.cameraMode} mode with ${this.filter} filter and burst of ${this.burst}`);
    }
}
class Instagram extends TakePhoto {
    createStory() {
        console.log("Creating a story on Instagram");
    }
    getSepia() {
        console.log("Applying sepia filter on Instagram");
    }
}
const Ian = new Instagram("portrait", "sepia", 3); //los objetos de la clase abstracta no se pueden instanciar, pero si se pueden instanciar las clases hijas
Ian.getSepia();
Ian.takePhoto();
Ian.createStory();
