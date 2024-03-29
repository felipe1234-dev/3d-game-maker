import { Game } from "@local/classes";
import { generateID } from "../utils";
import * as THREE from "three";

interface StageOptions {
    id?: number;
    uuid?: string;
    name: string;
    game?: Game.Core;
    scenes?: Game.Scene[];
}

class Stage extends THREE.EventDispatcher {
    public readonly id: number;
    public readonly uuid: string;
    public game?: Game.Core;

    public name: string;
    public scenes: Game.Scene[];

    constructor(
        options: StageOptions = {
            name: "",
            scenes: [],
        }
    ) {
        super();

        const {
            id = generateID(),
            uuid = THREE.MathUtils.generateUUID(),
            name = "",

            game,
            scenes = [],
        } = options;

        this.id = id;
        this.uuid = uuid;

        this.game = game;
        this.name = name;
        this.scenes = [];

        for (const scene of scenes) {
            this.addScene(scene);
        }
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

        this.dispatchEvent({ type: "addScene", scene });
    }

    public removeScene(sceneOrUuidOrId: Game.Scene | string | number): void {
        let scene: Game.Scene | undefined;

        if (sceneOrUuidOrId instanceof Game.Scene) {
            const sceneUUID = sceneOrUuidOrId.uuid;
            scene = sceneOrUuidOrId;

            this.scenes = this.scenes.filter(scene => scene.uuid !== sceneUUID);
            if (this.game)
                this.game.scenes = this.scenes.filter(
                    scene => scene.uuid !== sceneUUID
                );
        }

        if (typeof sceneOrUuidOrId === "string") {
            const sceneUUID = sceneOrUuidOrId;
            scene = this.scenes.find(scene => scene.uuid === sceneUUID);

            this.scenes = this.scenes.filter(scene => scene.uuid !== sceneUUID);
            if (this.game)
                this.game.scenes = this.scenes.filter(
                    scene => scene.uuid !== sceneUUID
                );
        }

        if (typeof sceneOrUuidOrId === "number") {
            const sceneID = sceneOrUuidOrId;
            scene = this.scenes.find(scene => scene.id === sceneID);

            this.scenes = this.scenes.filter(scene => scene.id !== sceneID);
            if (this.game)
                this.game.scenes = this.scenes.filter(
                    scene => scene.id !== sceneID
                );
        }

        this.dispatchEvent({ type: "removeScene", scene });
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

            sceneClone = this.game?.scenes
                .find(scene => scene.uuid === sceneUUID)
                ?.clone(true);
        }

        if (typeof sceneOrUuidOrId === "number") {
            const sceneID = sceneOrUuidOrId;
            const sceneUUID = this.game?.scenes.find(
                scene => scene.id === sceneID
            )?.uuid;

            if (thisStageScenes.includes(sceneUUID ?? "")) {
                return;
            }

            sceneClone = this.game?.scenes
                .find(scene => scene.id === sceneID)
                ?.clone(true);
        }

        if (!sceneClone) {
            return;
        }

        this.game?.stages.forEach(stage => stage.removeScene(sceneOrUuidOrId));
        this.addScene(sceneClone);
    }

    public toJSON(): Game.Formats.Stage {
        const json: Game.Formats.Stage = {
            id: this.id,
            uuid: this.uuid,
            name: this.name,
            scenes: [],
        };

        if (this.game) json.game = this.game.uuid;

        for (const scene of this.scenes) {
            json.scenes.push(scene.uuid);
        }

        return json;
    }

    public static fromJSON(json: Game.Formats.Stage): Game.Stage {
        const stage = new Stage({
            id: json.id,
            uuid: json.uuid,
            name: json.name,
        });

        return stage;
    }
}

export default Stage;
export type { StageOptions };