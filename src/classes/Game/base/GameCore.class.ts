import { Game } from "@local/classes";
import { generateID } from "../utils/private";
import * as THREE from "three";

interface GameOptions {
    id?: number;
    uuid?: string;

    scenes?: Game.Scene[];
    stages?: Game.Stage[];
    cameras?: Game.Camera[];

    renderer?: Game.Renderer;
}

class GameCore extends THREE.EventDispatcher {
    public readonly id: number;
    public readonly uuid: string;

    public stages: Game.Stage[];
    public scenes: Game.Scene[];

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
            scenes = [],
            stages = [],
            cameras = [],
            renderer = new Game.Renderer({ antialias: true })
        } = options;

        this.id = id;
        this.uuid = uuid;

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