import * as PIXI from 'pixi.js';
import { GAME_WIDTH, GAME_HEIGHT } from 'config';
import HomeScroller from '../components/HomeScroller';
import { sound } from '@pixi/sound';

export default class Home extends PIXI.Container {
    scroller: HomeScroller;

    constructor(app: PIXI.Application) {
        super();
        this.scroller = new HomeScroller(app);
        this.addChild(this.scroller);
        let texture = app.loader.resources['start-seen'].texture;
        let image = new PIXI.Sprite(texture);
        image.width = GAME_WIDTH;
        image.height = GAME_HEIGHT;
        this.addChild(image);
        sound.play('sound-start', {
            loop: true,
        });
        sound.volume('sound-start', 0.3);
    }

    public update() {
        this.scroller.update();
    }
}
