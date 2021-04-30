import * as PIXI from 'pixi.js';
import Home from './views/Home';
import { GAME_SIZE, GAME_WIDTH, GAME_HEIGHT } from 'config';

export default class App extends PIXI.Application {
    constructor() {
        let { w, h } = GAME_SIZE();
        super({
            width: w,
            height: h,
        });

        this.loader.onComplete.add(() => {
            this.stage.addChild(new Home(this));
            changeSize();
        });

        let resources = [
            {
                name: 'bg_water',
                path: 'bg_water.png',
            },
            {
                name: 'wall',
                path: 'wall.json',
            },
            {
                name: 'start-seen',
                path: 'start.png',
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
