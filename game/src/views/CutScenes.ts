import * as PIXI from 'pixi.js';
import { GAME_WIDTH, GAME_HEIGHT } from 'config';
import HomeScroller from '../components/HomeScroller';

export default class Scenes extends PIXI.Container {
    scroller: HomeScroller;

    constructor(app: PIXI.Application) {
        super();
        this.scroller = new HomeScroller(app);
        this.addChild(this.scroller);
    }

    public update() {
        this.scroller.update();
    }
}
