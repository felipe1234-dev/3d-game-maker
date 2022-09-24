import * as THREE from "three";
import { Game } from "..";

class GameCore extends THREE.EventDispatcher {
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

    constructor(props: {
        name: string;
        description: string;

        scenes?: Game.Scene[];
        stages?: Game.Stage[];
        cameras?: Game.Camera[];

        renderer?: Game.Renderer;
    }) {
        super();
        
        this.uuid = THREE.MathUtils.generateUUID();

        const {
            name,
            description,
            scenes,
            stages,
            cameras,
            renderer,
        } = props;

        this.name = name;
        this.description = description;

        this.current = {
            scene: scenes ? scenes[0] : undefined,
            stage: scenes ? scenes[0].stage : undefined,
            camera: cameras ? cameras[0] : undefined
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

        this.renderer = renderer || new Game.Renderer({ antialias: true});
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
}

export default GameCore;