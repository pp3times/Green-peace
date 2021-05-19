import * as PIXI from 'pixi.js';
import { GAME_WIDTH, GAME_HEIGHT } from 'config';

export default class Scroller extends PIXI.TilingSprite {
    viewportX: number;
    DELTA_X: number;
    SCROLL_SPEED: number;

    constructor(
        app: PIXI.Application,
        texture: PIXI.Texture<PIXI.Resource>,
        width?: number,
        height?: number
    ) {
        super(texture);
        this.position.x = 0;
        this.position.y = 0;
        this.width = GAME_WIDTH;
        this.height = GAME_HEIGHT;
        this.tileScale.x = GAME_WIDTH / (width || GAME_WIDTH);
        this.tileScale.y = GAME_HEIGHT / (height || texture.height);
        this.DELTA_X = 0.128;
        this.viewportX = 0;
        this.SCROLL_SPEED = 10;
    }

    public setViewportX(newViewportX: number) {
        let distanceTravelled = this.viewportX - newViewportX;
        this.viewportX = newViewportX;
        this.tilePosition.x -= distanceTravelled * this.DELTA_X;
    }

    public update() {
        this.setViewportX(this.viewportX + this.SCROLL_SPEED);
    }
}
