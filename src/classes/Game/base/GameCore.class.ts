import * as THREE from "three";
import { Game } from "@local/classes";
import { generateID } from "../utils/private";

interface GameOptions {
    id?: number;
    uuid?: string;

    name: string;
    description: string;

    scenes?: Game.Scene[];
    stages?: Game.Stage[];
    cameras?: Game.Camera[];

    renderer?: Game.Renderer;
}

class GameCore extends THREE.EventDispatcher {
    public readonly id: number;
    public readonly uuid: string;

    public name: string;
    public description: string;

    public stages: Game.Stage[];
    public scenes: Game.Scene[];
    public cameras: Game.Camera[];

    public current: {
        scene?: Game.Scene;
        stage?: Game.Stage;
        camera?: Game.Camera;
    };

    public renderer: Game.Renderer;

    constructor(options: GameOptions) {
        super();

        const {
            id = generateID(),
            uuid = THREE.MathUtils.generateUUID(),

            name,
            description,
            scenes = [],
            stages = [],
            cameras = [],
            renderer = new Game.Renderer({ antialias: true }),
        } = options;

        this.id = id;
        this.uuid = uuid;

        this.name = name;
        this.description = description;

        this.current = {
            scene: scenes[0] || undefined,
            stage: scenes[0]?.stage || undefined,
            camera: cameras[0] || undefined,
        };

        this.stages = stages;
        this.scenes = scenes;
        this.cameras = cameras;

        for (const stage of this.stages) {
            stage.game = this;
        }

        for (const scene of this.scenes) {
            scene.game = this;
        }

        for (const camera of this.cameras) {
            camera.game = this;
        }

        this.renderer = renderer;
    }

    public get currentScene(): Game.Scene | undefined {
        return this.current.scene;
    }

    public get currentStage(): Game.Stage | undefined {
        return this.current.stage;
    }

    public get currentCamera(): Game.Camera | undefined {
        return this.current.camera;
    }

    public toJSON(): Game.Formats.Game {
        const json: Game.Formats.Game = {
            id: this.id,
            uuid: this.uuid,
            name: this.name,
            description: this.description,
            stages: this.stages.map(stage => stage.toJSON()),
            scenes: this.scenes.map(scene => scene.toJSON()),
            cameras: this.cameras.map(camera => camera.toJSON()),
            renderer: this.renderer.toJSON(),
            current: {
                scene: this.current.scene?.uuid || "",
                stage: this.current.stage?.uuid || "",
                camera: this.current.camera?.uuid || ""
            }
        };

        return json;
    }

    public static fromJSON(json: Game.Formats.Game): GameCore {
        const stages: Game.Stage[] = [];
        const scenes: Game.Scene[] = [];

        for (const stageJSON of json.stages) {
            const stage = Game.Stage.fromJSON(stageJSON);
            const sceneJSONs = json.scenes.filter(
                sceneJSON => sceneJSON.object.stage === stage.uuid
            );

            for (const sceneJSON of sceneJSONs) {
                const scene = Game.Scene.fromJSON(sceneJSON);

                stage.addScene(scene);
                scenes.push(scene);
            }

            stages.push(stage);
        }

        const game = new GameCore({
            id: json.id,
            uuid: json.uuid,

            name: json.name,
            description: json.description,

            stages,
            scenes,
            cameras: [], // TODO: Filter cameras and put here

            renderer: Game.Renderer.fromJSON(json.renderer),
        });

        return game;
    }
}

export default GameCore;
export type { GameOptions };