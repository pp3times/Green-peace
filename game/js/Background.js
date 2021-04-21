
class Background extends PIXI.TilingSprite{
    constructor() {
        let texture = main.loader.resources["bg_water"].texture;
        super(texture, 1920, texture.baseTexture.height);
        this.DELTA_X = 0.128;
        this.position.x = 0;
        this.position.y = 0;
        this.tilePosition.x = 0;
        this.tilePosition.y = 0;
        this.viewportX = 0;

        this.setViewportX = function(newViewportX) {
            let distanceTravelled = newViewportX - this.viewportX;
            this.viewportX = newViewportX;
            this.tilePosition.x -= (distanceTravelled * this.DELTA_X);
        };
    }
}
