import * as PIXI from 'pixi.js';
import GameScroller from '../components/GameScroller';
import IView from './IView';
import App from '../App';

export default class Game extends IView {
    constructor(app: App) {
        super(app);
        this.scroller = new GameScroller(app);
        this.addChild(this.scroller);
    }

    public update() {
        this.scroller.update();
    }
}
