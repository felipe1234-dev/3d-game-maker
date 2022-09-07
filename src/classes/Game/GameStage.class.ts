import * as THREE from "three";
import { Game } from "..";

class GameStage extends THREE.EventDispatcher {
    public readonly id: number;
    public readonly uuid: string;
    public game?: Game.Core;

    public name: string;
    public scenes: Game.Scene[];

    constructor(name: string, game?: Game.Core) {
        super();

        this.id = new Date().valueOf();
        this.uuid = THREE.MathUtils.generateUUID();
        this.game = game;

        this.name = name;
        this.scenes = [];
    }

    public addScene(scene: Game.Scene): void {
        const alreadyExists = 
            this.game?.scenes.map(s => s.uuid).includes(scene.uuid) ||
            this.scenes.map(s => s.uuid).includes(scene.uuid);

        if (alreadyExists) {
            return;
        }

        scene.stage = this;
        this.game?.scenes.push(scene);
        this.scenes.push(scene);

        this.dispatchEvent({ type: "add-scene", scene });
    }

    public removeScene(sceneOrUuidOrId: Game.Scene | string | number): void {
        let scene: Game.Scene | undefined;

        if (sceneOrUuidOrId instanceof Game.Scene) {
            const sceneUUID = sceneOrUuidOrId.uuid;
            scene = sceneOrUuidOrId;

            this.scenes = this.scenes.filter(scene => scene.uuid !== sceneUUID);
            if (this.game) 
                this.game.scenes = this.scenes.filter(scene => scene.uuid !== sceneUUID);
        }

        if (typeof sceneOrUuidOrId === "string") {
            const sceneUUID = sceneOrUuidOrId;
            scene = this.scenes.find(scene => scene.uuid === sceneUUID);

            this.scenes = this.scenes.filter(scene => scene.uuid !== sceneUUID);
            if (this.game) 
                this.game.scenes = this.scenes.filter(scene => scene.uuid !== sceneUUID);
        }

        if (typeof sceneOrUuidOrId === "number") {
            const sceneID = sceneOrUuidOrId;
            scene = this.scenes.find(scene => scene.id === sceneID);

            this.scenes = this.scenes.filter(scene => scene.id !== sceneID);
            if (this.game)
                this.game.scenes = this.scenes.filter(scene => scene.id !== sceneID);
        }

        this.dispatchEvent({ type: "remove-scene", scene });
    }

    public transferScene(sceneOrUuidOrId: Game.Scene | string | number): void {
        let sceneClone;
        const thisStageScenes = this.scenes.map(scene => scene.uuid);

        if (sceneOrUuidOrId instanceof Game.Scene) {
            const scene = sceneOrUuidOrId;

            if (thisStageScenes.includes(scene.uuid)) {
                return;
            }

            sceneClone = scene.clone(true);
        }

        if (typeof sceneOrUuidOrId === "string") {
            const sceneUUID = sceneOrUuidOrId;

            if (thisStageScenes.includes(sceneUUID)) {
                return;
            }

            sceneClone = this.game?.scenes.find(scene => scene.uuid === sceneUUID)?.clone(true);
        }

        if (typeof sceneOrUuidOrId === "number") {
            const sceneID = sceneOrUuidOrId;
            const sceneUUID = this.game?.scenes.find(scene => scene.id === sceneID)?.uuid;

            if (thisStageScenes.includes(sceneUUID ?? "")) {
                return;
            }

            sceneClone = this.game?.scenes.find(scene => scene.id === sceneID)?.clone(true);
        }

        if (!sceneClone) {
            return;
        }

        this.game?.stages.forEach(stage => stage.removeScene(sceneOrUuidOrId));
        this.addScene(sceneClone);
    }
}

export default GameStage;