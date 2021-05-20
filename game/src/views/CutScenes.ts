import HomeScroller from '../components/HomeScroller';
import IView from './IView';
import App from '../App';
import * as PIXI from 'pixi.js';
import { GAME_HEIGHT, GAME_SIZE, GAME_WIDTH } from 'config';
import { TweenMax } from 'gsap';

interface IScene {
    frames: string[];
    duration: number;
    dpf: number;
}

export default class CutScenes extends IView {
    scenes: IScene[];

    constructor(app: App, scenes: IScene[]) {
        super(app);
        this.scenes = scenes;
    }

    initial() {
        super.initial();

        this.scenes.forEach(async (scene, index) => {
            let sprite: PIXI.AnimatedSprite;
            await setTimeout(() => {
                let textureArray: PIXI.Texture[] = [];

                scene.frames.forEach((frame) => {
                    let texture = this.app.loader.resources[frame].texture;
                    textureArray.push(texture);
                });
                sprite = new PIXI.AnimatedSprite(textureArray);
                sprite.alpha = 0;
                let { w, h } = GAME_SIZE();
                sprite.width = w;
                sprite.height = h;
                sprite.animationSpeed = 20 / scene.dpf;
                this.addChild(sprite);
                TweenMax.to(sprite, 0.2, {
                    pixi: { alpha: 1 },
                    ease: 'easeIn',
                }).then(() => sprite.play());
                setTimeout(() => {
                    TweenMax.to(sprite, 0.2, {
                        pixi: { alpha: 0 },
                        ease: 'easeIn',
                    }).then(() => {
                        this.removeChild(sprite);
                    });
                }, scene.duration);
            }, scene.duration * index);
        });
    }
}
