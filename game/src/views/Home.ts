import * as PIXI from 'pixi.js';
import { GAME_WIDTH, GAME_HEIGHT } from 'config';

export default class Home extends PIXI.Container {
    constructor(app: PIXI.Application) {
        super();
        let texture = app.loader.resources['start-seen'].texture;
        let image = new PIXI.Sprite(texture);
        image.width = GAME_WIDTH;
        image.height = GAME_HEIGHT;
        this.addChild(image);
    }
}
