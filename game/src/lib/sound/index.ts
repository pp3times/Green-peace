import {
    CompleteCallback,
    IMediaInstance,
    PlayOptions,
    sound,
} from '@pixi/sound';
import TWEEN from '@tweenjs/tween.js';

export function fadeIn(
    alias: string,
    volume: number,
    duration?: number,
    options?: PlayOptions | CompleteCallback | string
): IMediaInstance | Promise<IMediaInstance> {
    let s = sound.play(alias, options);
    sound.volume(alias, 0);
    let state = { value: 0 };
    new TWEEN.Tween(state)
        .to({ value: volume }, duration || 1000)
        .onUpdate(() => {
            sound.volume(alias, state.value);
        })
        .start();
    return s;
}

export function fadeOut(alias: string, duration?: number) {
    let state = { value: sound.find(alias).volume };
    new TWEEN.Tween(state)
        .to({ value: 0 }, duration || 1000)
        .onUpdate(() => {
            sound.volume(alias, state.value);
        })
        .start();
}
