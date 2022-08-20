import * as THREE from "three";
import { Game } from "..";

class Stage {
    public readonly id: number;
    public readonly uuid: string;
    public game: Game.Core;

    public name: string;
    public scenes: Game.Scene[];

    constructor(name: string, game: Game.Core) {
        this.id = new Date().valueOf();
        this.uuid = THREE.MathUtils.generateUUID();
        this.game = game;

        this.name = name;
        this.scenes = [];
    }

    public addScene(scene: Game.Scene): void {
        if (!this.game.scenes.map(s => s.uuid).includes(scene.uuid))
            this.game.scenes.push(scene);
        
        if (!this.scenes.map(s => s.uuid).includes(scene.uuid))
            this.scenes.push(scene);
    }

    public removeScene(sceneOrUuidOrId: Game.Scene | string | number): void {
        if (sceneOrUuidOrId instanceof Game.Scene) {
            const sceneUUID = sceneOrUuidOrId.uuid;

            this.scenes = this.scenes.filter(scene => scene.uuid !== sceneUUID);
            this.game.scenes = this.scenes.filter(scene => scene.uuid !== sceneUUID);
        }

        if (typeof sceneOrUuidOrId === "string") {
            const sceneUUID = sceneOrUuidOrId;

            this.scenes = this.scenes.filter(scene => scene.uuid !== sceneUUID);
            this.game.scenes = this.scenes.filter(scene => scene.uuid !== sceneUUID);
        }

        if (typeof sceneOrUuidOrId === "number") {
            const sceneID = sceneOrUuidOrId;

            this.scenes = this.scenes.filter(scene => scene.id !== sceneID);
            this.game.scenes = this.scenes.filter(scene => scene.id !== sceneID);
        }
    }
}

export default Stage;