function Main() {
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

    this.loader = Loader()

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
}