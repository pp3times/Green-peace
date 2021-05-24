import * as PIXI from 'pixi.js';
import { GAME_WIDTH, GAME_HEIGHT } from 'config';
import HomeScroller from '../components/HomeScroller';
import App from '../App';
import { TweenMax } from 'gsap';
import IView from './IView';
import Game from './Game';
import { fadeIn, fadeOut } from '../lib/sound';
import { sound } from '@pixi/sound';
import pixi = gsap.plugins.pixi;
import Player from '../Player';

export default class End extends IView {
    player: Player;

    constructor(app: App, player: Player) {
        super(app);
        this.player = player;
        this.scroller = new HomeScroller(app);
        this.addChild(this.scroller);
    }

    initial() {
        super.initial();
        let res = this.app.loader.resources;
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 50,
            fontWeight: 'bold',
            fill: '#ffffff',
        });
        let text = new PIXI.Text('GAME OVER', style);
        text.x = GAME_WIDTH / 2;
        text.y = GAME_HEIGHT / 2 - 100;
        text.resolution = 3;
        text.anchor.set(0.5);
        {
            let t = new PIXI.Text(`POINT ${this.player.point}`, style);
            t.style.fontSize = 35;
            t.y = t.height;
            t.resolution = 3;
            t.anchor.set(0.5);
            text.addChild(t);
        }

        this.addChild(text);

        {
            let image = new PIXI.Sprite(res['info'].texture);
            image.x = GAME_WIDTH / 2;
            image.y = GAME_HEIGHT / 2;
            image.anchor.set(0.5);
            image.interactive = true;
            image.buttonMode = true;
            // @ts-ignore
            image.on('pointerdown', () => {});
            this.addChild(image);
        }
    }

    beforeDestroy() {
        super.beforeDestroy();
    }
}
