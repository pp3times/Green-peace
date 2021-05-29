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
import CutScenes from './CutScenes';
import GameScroller from '../components/GameScroller';

export default class End extends IView {
    player: Player;
    end: PIXI.Sprite;

    constructor(app: App, player: Player) {
        super(app);
        this.player = player;
        this.scroller = new GameScroller(app);
        this.addChild(this.scroller);
        this.scroller.texture = app.loader.resources['dark_sea'].texture;
        this.end = new PIXI.Sprite(app.loader.resources['END'].texture);
        this.end.width = GAME_WIDTH;
        this.end.height = GAME_HEIGHT;
        this.end.alpha = 0;
        this.addChild(this.end);
    }

    initial() {
        super.initial();
        let res = this.app.loader.resources;
        fadeIn('end_song', 0.3, 2000, {
            loop: true,
        });
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
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 50,
            fontWeight: 'bold',
            fill: '#ffffff',
        });
        let text = new PIXI.Text('GAME OVER', style);
        text.x = GAME_WIDTH / 2;
        text.y = GAME_HEIGHT / 2 - 150;
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
        let played = false;
        let action = new PIXI.Sprite(res['next'].texture);
        action.x = GAME_WIDTH / 2;
        action.y = GAME_HEIGHT / 2;
        action.anchor.set(0.5);
        action.interactive = true;
        action.buttonMode = true;
        // @ts-ignore
        action.on('mouseover', () => {
            TweenMax.to(action, 0.2, {
                pixi: { scale: 1.1 },
                ease: 'easeIn',
            });
        });
        // @ts-ignore
        action.on('mouseout', () => {
            TweenMax.to(action, 0.2, {
                pixi: { scale: 1 },
                ease: 'easeIn',
            });
        });
        // @ts-ignore
        action.on('pointerdown', () => {
            if (!played) {
                played = true;
                let scene = new CutScenes(
                    this.app,
                    [
                        {
                            frames: ['ENDING1-1-1'],
                            dpf: 1000,
                            duration: 4000,
                        },
                        {
                            frames: ['ENDING1-1-2'],
                            dpf: 1000,
                            duration: 4000,
                        },
                        {
                            frames: ['ENDING1-2-1'],
                            dpf: 1000,
                            duration: 4000,
                        },
                        {
                            frames: ['ENDING2-1-1'],
                            dpf: 1000,
                            duration: 4000,
                        },
                        {
                            frames: ['ENDING2-2-1'],
                            dpf: 1000,
                            duration: 4000,
                        },
                    ],
                    true
                );
                scene.start().then(() => {
                    action.texture = res['info'].texture;
                    action.x = GAME_WIDTH / 4.5;
                    action.y = GAME_HEIGHT - action.height / 2 - 60;
                    this.removeChild(text);
                    this.removeChild(this.scroller);
                    this.scroller = null;
                    this.end.alpha = 1;
                });
            } else {
                window.location.href = 'https://fisherman-gpg.netlify.app/landing';
            }
        });
        this.addChild(action);
    }

    beforeDestroy() {
        super.beforeDestroy();
    }
}
