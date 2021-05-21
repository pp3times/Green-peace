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
    background: PIXI.Sprite;

    constructor(app: App, scenes: IScene[]) {
        super(app);
        this.scenes = scenes;
        this.alpha = 1;
        this.background = new PIXI.Sprite(
            this.app.renderer.generateTexture(
                new PIXI.Graphics()
                    .beginFill(0x000000)
                    .drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
                    .endFill(),
                PIXI.SCALE_MODES.NEAREST
            )
        );
        this.background.interactive = true;

        this.addChild(this.background);
        this.mask = new PIXI.Sprite(
            this.app.renderer.generateTexture(
                new PIXI.Graphics()
                    .beginFill(0xff0000)
                    .drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
                    .endFill(),
                PIXI.SCALE_MODES.NEAREST
            )
        );
    }

    initial() {}

    start(): Promise<void> {
        return new Promise(async (resolve) => {
            for (let scene of this.scenes) {
                let sprite: PIXI.AnimatedSprite;
                await new Promise((resolve1) => {
                    let textureArray: PIXI.Texture[] = [];

                    scene.frames.forEach((frame) => {
                        let texture = this.app.loader.resources[frame].texture;
                        textureArray.push(texture);
                    });
                    sprite = new PIXI.AnimatedSprite(textureArray);
                    sprite.width = GAME_WIDTH;
                    sprite.height = GAME_HEIGHT;
                    sprite.animationSpeed = 20 / scene.dpf;
                    sprite.alpha = 0;
                    this.addChild(sprite);

                    TweenMax.to(sprite, 1, {
                        pixi: { alpha: 1 },
                        ease: 'easeIn',
                    }).then(() => {
                        sprite.play();

                        setTimeout(() => {
                            TweenMax.to(sprite, 1, {
                                pixi: { alpha: 0 },
                                ease: 'easeIn',
                            }).then(() => {
                                this.removeChild(sprite);
                                resolve1(0);
                            });
                        }, scene.duration);
                    });
                });
            }
            TweenMax.to(this, 1, {
                pixi: { alpha: 0 },
                ease: 'easeIn',
            }).then(() => resolve());
        });
    }
}
