import * as PIXI from 'pixi.js';
import GameScroller from '../components/GameScroller';
import { GAME_HEIGHT, GAME_WIDTH } from '../config';

export default class Game extends PIXI.Container {
    scroller: GameScroller;

    constructor(app: PIXI.Application) {
        super();
        this.scroller = new GameScroller(app);
        this.addChild(this.scroller);
    }

    public update() {
        this.scroller.update();
    }
}
