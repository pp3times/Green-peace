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
            let logo = new PIXI.Sprite(res['logo'].texture);
            logo.x = GAME_WIDTH / 2;
            logo.y = GAME_HEIGHT / 8;
            logo.anchor.set(0.5);
            logo.interactive = true;
            logo.buttonMode = true;
            // @ts-ignore

            this.addChild(logo);
        }
        {
            let btn = new PIXI.Sprite(res['start_button'].texture);
            btn.x = GAME_WIDTH / 2;
            btn.y = GAME_HEIGHT / 2 - 30;
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
                fadeIn('click', 5, 2000);
                this.app.changeScenes(new Game(this.app));
            });
            this.addChild(btn);
        }
        {
            let btn2 = new PIXI.Sprite(res['more_info'].texture);
            btn2.x = GAME_WIDTH / 2;
            btn2.y = GAME_HEIGHT / 2 + 100;
            btn2.anchor.set(0.5);
            btn2.interactive = true;
            btn2.buttonMode = true;
            // @ts-ignore
            btn2.on('mouseover', () => {
                TweenMax.to(btn2, 0.2, {
                    pixi: { scale: 1.1 },
                    ease: 'easeIn',
                });
            });
            // @ts-ignore
            btn2.on('mouseout', () => {
                TweenMax.to(btn2, 0.2, {
                    pixi: { scale: 1 },
                    ease: 'easeIn',
                });
            });
            // @ts-ignore
            btn2.on('pointerdown', () => {
                fadeIn('click', 5, 2000);
                window.location.href = 'https://fisherman-gp.netlify.app/';
            });
            this.addChild(btn2);
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
                fadeIn('click', 5, 2000);
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
        fadeIn('sound-start', 0.3, 2000, {
            loop: true,
        });
    }

    beforeDestroy() {
        super.beforeDestroy();
        fadeOut('sound-start', 2000);
    }
}
