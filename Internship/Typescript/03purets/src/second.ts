/*interface TakePhoto{
   cameraMode: string;
   filter: string;
   burst: number;
   takePhoto(): void;
}

interface Story {
   createStory(): void;
}
// Implementing the TakePhoto interface in the Instagram class
class Instagram implements TakePhoto, Story {
    cameraMode: string;
    filter: string;
    burst: number;
    createStory(): void {
        console.log("Creating a story on Instagram");
    }

    constructor(cameraMode: string, filter: string, burst: number) {
        this.cameraMode = cameraMode;
        this.filter = filter;
        this.burst = burst;
    }

    takePhoto(): void {
        console.log(`Taking photo in ${this.cameraMode} mode with ${this.filter} filter and burst of ${this.burst}`);
    }
}*/