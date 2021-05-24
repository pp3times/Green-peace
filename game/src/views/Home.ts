import * as PIXI from 'pixi.js';
import { GAME_WIDTH, GAME_HEIGHT } from 'config';
import HomeScroller from '../components/HomeScroller';
import App from '../App';
import { TweenMax } from 'gsap';
import IView from './IView';
import Game from './Game';
import { fadeIn, fadeOut } from '../lib/sound';
import { sound } from '@pixi/sound';

export default class Home extends IView {
    constructor(app: App) {
        super(app);
        this.scroller = new HomeScroller(app);
        this.addChild(this.scroller);
    }

    initial() {
        super.initial();
        let res = this.app.loader.resources;
        {
            let btn = new PIXI.Sprite(res['start_button'].texture);
            btn.x = GAME_WIDTH / 2;
            btn.y = GAME_HEIGHT / 2 - 150;
            btn.anchor.set(0.5);
            btn.interactive = true;
            btn.buttonMode = true;
            // @ts-ignore
            btn.on('mouseover', () => {
                TweenMax.to(btn, 0.2, {
                    pixi: { scale: 1.1 },
                    ease: 'easeIn',
                });
            });
            // @ts-ignore
            btn.on('mouseout', () => {
                TweenMax.to(btn, 0.2, {
                    pixi: { scale: 1 },
                    ease: 'easeIn',
                });
            });
            // @ts-ignore
            btn.on('pointerdown', () => {
                this.app.changeScenes(new Game(this.app));
            });
            this.addChild(btn);
        }
        {
            let image = new PIXI.Sprite(res['sound_open'].texture);
            image.x = GAME_WIDTH;
            image.y = GAME_HEIGHT;
            image.anchor.set(1.2);
            image.interactive = true;
            image.buttonMode = true;
            // @ts-ignore
            image.on('pointerdown', () => {
                let open = this.app.option.sound;
                image.texture =
                    res[open ? 'sound_close' : 'sound_open'].texture;
                this.app.option.sound = !open;
                if (this.app.option.sound) {
                    sound.unmuteAll();
                } else {
                    sound.muteAll();
                }
            });
            this.addChild(image);
        }
        fadeIn('sound-start2', 0.3, 2000, {
            loop: true,
        });
    }

    beforeDestroy() {
        super.beforeDestroy();
        fadeOut('sound-start2', 2000);
    }
}
