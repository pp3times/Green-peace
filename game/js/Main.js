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

            this.pool = new WallSpritesPool();
            this.wallSlices = [];

            requestAnimationFrame(this.update);
        }

        this.update = () => {
            this.scroller.moveViewportXBy(this.SCROLL_SPEED);
            requestAnimationFrame(this.update);
        };

        this.#resources = [
            {
                name: "bg_water",
                path: "pixil-frame-0.png"
            },
            {
                name: "wall",
                path: "wall.json"
            }
        ]

        this.#Load()

        this.borrowWallSprites = function(num) {
            for (let i = 0; i < num; i++)
            {
                let sprite = this.pool.borrowWindow();
                if (i % 2 !== 0) {
                    sprite = this.pool.borrowDecoration();
                }
                sprite.position.x = -32 + (i * 64);
                sprite.position.y = 128;

                this.wallSlices.push(sprite);

                this.stage.addChild(sprite);
            }
        };

        this.returnWallSprites = function() {
            for (let i = 0; i < this.wallSlices.length; i++)
            {
                let sprite = this.wallSlices[i];
                this.stage.removeChild(sprite);
                if (i % 2 === 0) {
                    this.pool.returnWindow(sprite);
                } else {
                    this.pool.returnDecoration(sprite);
                }
            }

            this.wallSlices = [];
        };

        this.generateTestWallSpan1 = function() {
            let lookupTable = [
                this.pool.borrowFrontEdge,  // 1st slice
                this.pool.borrowWindow,     // 2nd slice
                this.pool.borrowDecoration, // 3rd slice
                this.pool.borrowWindow,     // 4th slice
                this.pool.borrowDecoration, // 5th slice
                this.pool.borrowWindow,     // 6th slice
                this.pool.borrowBackEdge    // 7th slice
            ];

            for (let i = 0; i < lookupTable.length; i++)
            {
                let func = lookupTable[i];

                let sprite = func.call(this.pool);
                sprite.position.x = 32 + (i * 64);
                sprite.position.y = 128;

                this.wallSlices.push(sprite);

                this.stage.addChild(sprite);
            }
        };

        this.generateTestWallSpan = function() {
            let lookupTable = [
                this.pool.borrowFrontEdge,  // 1st slice
                this.pool.borrowWindow,     // 2nd slice
                this.pool.borrowDecoration, // 3rd slice
                this.pool.borrowStep,       // 4th slice
                this.pool.borrowWindow,     // 5th slice
                this.pool.borrowBackEdge    // 6th slice
            ];

            let yPos = [
                128, // 1st slice
                128, // 2nd slice
                128, // 3rd slice
                192, // 4th slice
                192, // 5th slice
                192  // 6th slice
            ];

            for (let i = 0; i < lookupTable.length; i++)
            {
                let func = lookupTable[i];

                let sprite = func.call(this.pool);
                sprite.position.x = 64 + (i * 64);
                sprite.position.y = yPos[i];

                this.wallSlices.push(sprite);

                this.stage.addChild(sprite);
            }
        };

        this.clearTestWallSpan = function() {
            let lookupTable = [
                this.pool.returnFrontEdge,  // 1st slice
                this.pool.returnWindow,     // 2nd slice
                this.pool.returnDecoration, // 3rd slice
                this.pool.returnStep,       // 4th slice
                this.pool.returnWindow,     // 5th slice
                this.pool.returnBackEdge    // 6th slice
            ];

            for (let i = 0; i < lookupTable.length; i++)
            {
                let func = lookupTable[i];
                let sprite = this.wallSlices[i];

                this.stage.removeChild(sprite);
                func.call(this.pool, sprite);
            }

            this.wallSlices = [];
        };

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