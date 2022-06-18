import * as Game from "./index";

class Core {
    public readonly scenes: Array<Game.Scene>;
    private currentScene?: Game.Scene;
    
    constructor() {
        this.scenes = [];
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
    
    public getCurrentScene(): Game.Scene | undefined {
        return this.currentScene;
    }
    
    public setCurrentScene(name: string): void {
        this.currentScene = this.getScene(name);
    }
}

export default Core;