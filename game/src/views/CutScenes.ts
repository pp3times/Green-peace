import HomeScroller from '../components/HomeScroller';
import IView from './IView';
import App from '../App';

interface IScene {
    frames: IFrame[];
    duration: number;
    fps: number;
}

interface IFrame {
    resource: string;
}

export default class CutScenes extends IView {
    constructor(app: App, scenes: IScene[]) {
        super(app);
    }

    update() {}
}
