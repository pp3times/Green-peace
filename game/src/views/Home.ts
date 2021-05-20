import * as PIXI from 'pixi.js';
import { GAME_WIDTH, GAME_HEIGHT } from 'config';
import HomeScroller from '../components/HomeScroller';
import { sound } from '@pixi/sound';
import App from '../App';
import { TweenMax } from 'gsap';
import IView from './IView';
import Game from './Game';

export default class Home extends IView {
    constructor(app: App) {
        super(app);
        this.scroller = new HomeScroller(app);
        this.addChild(this.scroller);
        let res = app.loader.resources;
        {
            let image = new PIXI.Sprite(res['start-seen'].texture);
            image.width = GAME_WIDTH;
            image.height = GAME_HEIGHT;
            this.addChild(image);
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
                let open = app.option.sound;
                image.texture =
                    res[open ? 'sound_close' : 'sound_open'].texture;
                app.option.sound = !open;
                if (app.option.sound) {
                    sound.unmuteAll();
                } else {
                    sound.muteAll();
                }
            });
            this.addChild(image);
        }
        sound.play('sound-start', {
            loop: true,
        });
        sound.volume('sound-start', 0.3);
    }

    public update() {
        this.scroller.update();
    }
}
