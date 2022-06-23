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
        this.currentScene = this.scenes.filter((scene) => scene.name === name)[0] ?? undefined;
    }
    
    public getScene(name: string): Game.Scene | undefined {
        return this.scenes.filter((scene) => scene.name === name)[0] ?? undefined
    }
    
    public setCurrentScene(name: string): void {
        const scene = this.getScene(name);
        this.currentScene = scene ?? this.currentScene;
    }
}

export default Core;