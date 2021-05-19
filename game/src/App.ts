import * as PIXI from 'pixi.js';
import Home from './views/Home';
import { GAME_SIZE, GAME_WIDTH, GAME_HEIGHT } from 'config';
import Game from './views/Game';
import { sound } from '@pixi/sound';

interface IOption {
    sound: boolean;
}

export default class App extends PIXI.Application {
    option: IOption;

    constructor() {
        let { w, h } = GAME_SIZE();
        super({
            width: w,
            height: h,
        });

        this.option = {
            sound: true,
        };

        this.loader.onComplete.add(() => {
            this.stage.alpha = 0;
            const home = new Home(this);
            this.stage.addChild(home);
            let update = () => {
                home.update();
                requestAnimationFrame(update);
                if (this.stage.alpha < 1) {
                    this.stage.alpha += 0.005;
                }
            };
            requestAnimationFrame(update);
            changeSize();
        });

        let resources = [
            {
                name: 'bg_water',
                path: 'bg_water.png',
            },
            {
                name: 'game_bg',
                path: 'game_bg.png',
            },
            {
                name: 'wall',
                path: 'wall.json',
            },
            {
                name: 'start-seen',
                path: 'start.png',
            },
            {
                name: 'sound-start',
                path: 'start.mp3',
            },
            {
                name: 'sound_close',
                path: 'sound_close.png',
            },
            {
                name: 'sound_open',
                path: 'sound_open.png',
            },
        ];

        this.loader.onLoad.add(() => {
            console.log(`Loading...`);
        });
        this.loader.onProgress.add((data) => {
            console.log(`Progress load ${data.progress}%`);
        });
        this.loader.onError.add((err) => {
            console.log('ERROR LOAD', err);
        });

        resources.forEach((resource) => {
            this.loader.add(resource.name, `resources/${resource.path}`);
        });

        this.loader.load();

        let changeSize = () => {
            let ratio = Math.min(
                (window.innerWidth * 0.9) / GAME_WIDTH,
                (window.innerHeight * 0.9) / GAME_HEIGHT
            );
            this.stage.scale.x = this.stage.scale.y = ratio;
            this.stage.width = Math.ceil(GAME_WIDTH * ratio);
            this.stage.height = Math.ceil(GAME_HEIGHT * ratio);
            this.resize();
        };
    }
}
