import * as Game from "./index";

class Core {
    public readonly scenes: Array<Game.Scene>;
    public currentScene: Game.Scene;
    
    constructor(scenes: Array<Game.Scene>) {
        this.scenes = scenes;
        this.currentScene = scenes[0];
    }
    
    public addScene(scene: Game.Scene): void {
        this.scenes.push(scene);
    }
    
    public goToScene(name: string): void {
        const foundScene = this.scenes.find((scene) => scene.name === name);
        this.currentScene = foundScene ?? this.currentScene;
    }
    
    public getScene(name: string): Game.Scene | undefined {
        return this.scenes.find((scene) => scene.name === name);
    }
    
    public setCurrentScene(name: string): void {
        const scene = this.getScene(name);
        this.currentScene = scene ?? this.currentScene;
    }
}

export default Core;