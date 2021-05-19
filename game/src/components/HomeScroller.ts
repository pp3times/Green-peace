import * as PIXI from 'pixi.js';
import { GAME_WIDTH, GAME_HEIGHT } from 'config';
import Scroller from '../controllers/Scroller';

export default class HomeScroller extends Scroller {
    constructor(app: PIXI.Application) {
        let texture = app.loader.resources['game_bg'].texture;
        super(app, texture);
        this.DELTA_X = 0.01;
    }
}
