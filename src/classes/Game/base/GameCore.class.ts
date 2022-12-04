import { Game } from "@local/classes";
import { generateID } from "../utils";
import * as THREE from "three";

interface GameOptions {
    id?: number;
    uuid?: string;

    scenes?: Game.Scene[];
    stages?: Game.Stage[];

    renderer?: Game.Renderer;

    current?: {
        scene?: Game.Scene;
        stage?: Game.Stage;
        camera?: Game.Camera;
    };
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
            renderer = new Game.Renderer({ antialias: true }),
            current = {
                scene: scenes[0] || undefined,
                stage: scenes[0]?.stage || undefined
            },
        } = options;

        this.id = id;
        this.uuid = uuid;

        this.current = current;
        this.stages = stages;
        this.scenes = scenes;

        if (this.current.scene && !this.current.camera) {
            const camera = this.current.scene.children.find(
                object => Game.isCamera(object)
            ) as Game.Camera | undefined;

            if (camera) {
                this.current.camera = camera;
            }
        }

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

    public start(container: HTMLElement): void {
        if (
            !this.current.scene ||
            !this.current.camera
        ) return;

        this.renderer.setContainer(container);

        this.renderer.enablePhysics();

        const onResize = () => {
            if (!this.current.camera) return;
            if (!(this.current.camera instanceof Game.PerspectiveCamera)) return;

            this.current.camera.aspect =
                this.renderer.canvas.offsetWidth /
                this.renderer.canvas.offsetHeight;
            this.current.camera.updateProjectionMatrix();
        };

        window.addEventListener(
            "resize",
            onResize
        );
        new ResizeObserver(onResize).observe(container);

        for (const scene of this.scenes) {
            const bodies = scene.physics.bodies;
            for (const body of bodies) {
                body.needsUpdate = true;
            }
        }

        this.renderer.start(
            () => {
            },
            this.current.scene,
            this.current.camera
        );
    }

    public pause(): void {
        this.renderer.freeze();
    }

    public unpause(): void {
        this.renderer.unfreeze();
    }

    public toJSON(): Game.Formats.Game {
        const json: Game.Formats.Game = {
            id: this.id,
            uuid: this.uuid,
            stages: this.stages.map(stage => stage.toJSON()),
            scenes: this.scenes.map(scene => scene.toJSON()),
            renderer: this.renderer.toJSON(),
            current: {
                scene: this.current.scene?.uuid || "",
                stage: this.current.stage?.uuid || "",
                camera: this.current.camera?.uuid || "",
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

        const currentScene = scenes.find(scene => scene.uuid === json.current.scene);
        const currentStage = stages.find(stage => stage.uuid === json.current.stage);
        const currentCamera = currentScene?.children.find(
            object => object.uuid === json.current.camera
        ) as Game.Camera | undefined;

        const game = new GameCore({
            id: json.id,
            uuid: json.uuid,

            stages,
            scenes,

            renderer: Game.Renderer.fromJSON(json.renderer),

            current: {
                scene: currentScene,
                stage: currentStage,
                camera: currentCamera,
            }
        });

        return game;
    }
}

export default GameCore;
export type { GameOptions };