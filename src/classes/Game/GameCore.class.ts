import * as THREE from "three";
import { Game, Utils } from "..";

class GameCore extends THREE.EventDispatcher {
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

    public renderer: Utils.Renderer;

    constructor(props: {
        name: string;
        description: string;

        scenes?: Game.Scene[];
        stages?: Game.Stage[];
        cameras?: Game.Camera[];

        renderer?: Utils.Renderer;
    }) {
        super();
        
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

        this.renderer = renderer || new Utils.Renderer({ antialias: true});
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