class Scroller {
    constructor(stage) {
        this.bg = new Background();
        stage.addChild(this.bg);

        this.front = new Walls();
        stage.addChild(this.front);

        this.viewportX = 0;

        this.setViewportX = function(viewportX) {
            this.viewportX = viewportX;
            this.bg.setViewportX(viewportX);
            this.front.setViewportX(viewportX);
        };

        this.getViewportX = function() {
            return this.viewportX;
        };

        this.moveViewportXBy = function(units) {
            let newViewportX = this.viewportX + units;
            this.setViewportX(newViewportX);
        };
    }
}