class Main {
    #resources;

    constructor() {
        this.app = new PIXI.Application({
            width: 1920,
            height: 1080,
            antialias: true,
            transparent: false,
            backgroundColor: 0xFF00FF,
            resolution: 1,
            forceCanvas: true,
            autoResize: true,
            view: document.getElementById("app"),
        })

        this.stage = this.app.stage

        this.loader = PIXI.Loader.shared

        this.SCROLL_SPEED = 10

        this.loader.onComplete.add(() => {
            this.spriteSheetLoaded()
        })

        this.spriteSheetLoaded = () => {
            this.scroller = new Scroller(this.stage);
            requestAnimationFrame(this.update);
        }

        this.update = () => {
            this.scroller.moveViewportXBy(this.SCROLL_SPEED);
            requestAnimationFrame(this.update);
        };

        this.#resources = [
            {
                name: "bg_water",
                path: "bg_water.png"
            },
        ]

        this.#Load()
    }

    #Load() {
        this.loader.onLoad.add(() => {
            console.log(`Loading...`)
        })
        this.loader.onProgress.add((data) => {
            console.log(`Progress load ${data.progress}%`)
        })
        this.loader.onError.add((err) => {
            console.log("ERROR LOAD", err)
        })

        this.#resources.forEach((resource) => {
            this.loader.add(resource.name, `./resources/${resource.path}`)
        })

        this.loader.load();
    }
}