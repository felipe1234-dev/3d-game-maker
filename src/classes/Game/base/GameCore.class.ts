import * as THREE from "three";
import { Game } from "@local/classes";

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

    constructor(options: {
        id?: number;
        uuid?: string;

        name: string;
        description: string;

        scenes?: Game.Scene[];
        stages?: Game.Stage[];
        cameras?: Game.Camera[];

        renderer?: Game.Renderer;
    }) {
        super();

        const {
            id,
            uuid,

            name,
            description,
            scenes,
            stages,
            cameras,
            renderer,
        } = options;

        this.id = id ?? Game.generateID();
        this.uuid = uuid || THREE.MathUtils.generateUUID();

        this.name = name;
        this.description = description;

        this.current = {
            scene: scenes ? scenes[0] : undefined,
            stage: scenes ? scenes[0].stage : undefined,
            camera: cameras ? cameras[0] : undefined,
        };

        this.stages = stages || [];
        this.scenes = scenes || [];
        this.cameras = cameras || [];

        for (const stage of this.stages) {
            stage.game = this;
        }

        for (const scene of this.scenes) {
            scene.game = this;
        }

        for (const camera of this.cameras) {
            camera.game = this;
        }

        this.renderer = renderer || new Game.Renderer({ antialias: true });
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

    public toJSON(): Game.GameFormat {
        const json: Game.GameFormat = {
            uuid: this.uuid,
            name: this.name,
            description: this.description,
            stages: [],
            scenes: [],
            cameras: [],
            renderer: this.renderer.toJSON(),
        };

        for (const stage of this.stages) {
            json.stages.push(stage.toJSON());
        }

        for (const scene of this.scenes) {
            json.scenes.push(scene.toJSON());
        }

        for (const camera of this.cameras) {
            json.cameras.push(camera.toJSON());
        }

        return json;
    }

    public static fromJSON(json: Game.GameFormat): Game.Core {
        for (const stageJSON of json.stages) {
            const stage = Game.Stage.fromJSON(stageJSON);
            const stageScenes = json.scenes.filter(
                scene => scene.object.stage === stage.uuid
            );

            for (const sceneJSON of stageScenes) {
                const scene = Game.Scene.fromJSON(sceneJSON);
                stage.addScene(scene);
            }
        }

        const game = new Game.Core({
            name: json.name,
            description: json.description,
            stages: [],
            scenes: [],
            cameras: [],
            renderer: new Game.Renderer({ antialias: true }),
        });

        (game as any).uuid = json.uuid;

        if (json.renderer.autoClear)
            game.renderer.autoClear = json.renderer.autoClear;
        if (json.renderer.autoClearColor)
            game.renderer.autoClearColor = json.renderer.autoClearColor;
        if (json.renderer.autoClearDepth)
            game.renderer.autoClearDepth = json.renderer.autoClearDepth;
        if (json.renderer.autoClearStencil)
            game.renderer.autoClearStencil = json.renderer.autoClearStencil;
        if (json.renderer.sortObjects)
            game.renderer.sortObjects = json.renderer.sortObjects;
        if (json.renderer.localClippingEnabled)
            game.renderer.localClippingEnabled =
                json.renderer.localClippingEnabled;
        if (json.renderer.physicallyCorrectLights)
            game.renderer.physicallyCorrectLights =
                json.renderer.physicallyCorrectLights;
        if (json.renderer.toneMapping)
            game.renderer.toneMapping = json.renderer.toneMapping;
        if (json.renderer.toneMappingExposure)
            game.renderer.toneMappingExposure =
                json.renderer.toneMappingExposure;
        if (json.renderer.shadowMap?.type)
            game.renderer.shadowMap.type = json.renderer.shadowMap.type;
        if (json.renderer.shadowMap?.enabled)
            game.renderer.shadowMap.enabled = json.renderer.shadowMap.enabled;
        if (json.renderer.pixelRatio)
            game.renderer.pixelRatio = json.renderer.pixelRatio;

        return game;
    }
}

export default GameCore;