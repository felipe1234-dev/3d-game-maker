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
            id = Game.Utils.generateID(),
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
}

export default GameCore;