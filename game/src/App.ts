import * as PIXI from 'pixi.js';
import Home from './views/Home';
import { GAME_SIZE, GAME_WIDTH, GAME_HEIGHT } from 'config';
import { PixiPlugin } from 'gsap/all';
import { gsap, TweenMax } from 'gsap';
import resources from './resources';
import IView from './views/IView';
import CutScenes from './views/CutScenes';

interface IOption {
    sound: boolean;
}

export default class App extends PIXI.Application {
    option: IOption;
    currentView: IView;

    constructor() {
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXI);

        let { w, h } = GAME_SIZE();
        super({
            width: w,
            height: h,
        });

        this.option = {
            sound: true,
        };

        this.loader.onComplete.add(() => {
            this.currentView = new Home(this);
            this.stage.addChild(this.currentView);
            let update = () => {
                this.currentView.update();
                requestAnimationFrame(update);
            };
            requestAnimationFrame(update);
            changeSize();
            this.currentView.initial();
        });

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

    changeScenes(next: IView) {
        TweenMax.to(this.currentView, 2, {
            pixi: { alpha: 0 },
            ease: 'easeIn',
        }).then(() => {
            this.currentView.destroy();
            this.stage.removeChild(this.currentView);
            this.stage.addChild(next);
            this.currentView = next;
            next.initial();
        });
    }
}
