import * as PIXI from 'pixi.js';
import Home from './views/Home';
import { GAME_SIZE, GAME_WIDTH, GAME_HEIGHT } from 'config';
import { PixiPlugin } from 'gsap/all';
import { gsap, TweenMax } from 'gsap';
import resources from './resources';
import IView from './views/IView';
import TWEEN from '@tweenjs/tween.js';

interface IOption {
    sound: boolean;
}

export default class App extends PIXI.Application {
    option: IOption;
    currentView: IView;
    mask: PIXI.Sprite;

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

        this.mask = new PIXI.Sprite(
            this.renderer.generateTexture(
                new PIXI.Graphics()
                    .beginFill(0xff0000)
                    .drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
                    .endFill(),
                PIXI.SCALE_MODES.NEAREST
            )
        );
        this.mask.interactive = true;
        this.mask.alpha = 0;

        this.loader.onComplete.add(() => {
            this.inital();
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
    }

    inital() {
        this.currentView = new Home(this);
        this.stage.addChild(this.currentView);

        let update = () => {
            this.currentView.update();
            TWEEN.update();
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
        this.changeSize();
        this.currentView.initial();
        this.stage.addChild(this.mask);
    }

    changeScenes(next: IView) {
        this.mask.interactive = true;
        this.currentView.beforeDestroy();

        TweenMax.to(this.mask, 2, {
            pixi: { alpha: 0 },
            ease: 'easeIn',
        }).then(() => {
            this.currentView.destroy();
            this.stage.removeChild(this.currentView);
            this.stage.removeChild(this.mask);
            this.currentView = next;
            this.stage.addChild(this.currentView);
            this.currentView.initial();
            this.stage.addChild(this.mask);
        });
    }

    private changeSize() {
        let ratio = Math.min(
            (window.innerWidth * 0.9) / GAME_WIDTH,
            (window.innerHeight * 0.9) / GAME_HEIGHT
        );
        this.stage.scale.x = this.stage.scale.y = ratio;
        this.stage.width = Math.ceil(GAME_WIDTH * ratio);
        this.stage.height = Math.ceil(GAME_HEIGHT * ratio);
        this.resize();
    }
}
