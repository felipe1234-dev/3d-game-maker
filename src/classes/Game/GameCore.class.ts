import * as THREE from "three";
import { Game } from "..";

class GameCore {
    public name: string;
    public description: string;

    public stages: Game.Stage[];
    public scenes: Game.Scene[];

    public current: {
        scene?: Game.Scene;
        stage?: Game.Stage;
    };

    constructor(props: {
        name: string;
        description: string;

        scenes?: Game.Scene[];
        stages?: Game.Stage[];
    }) {
        const {
            name,
            description,
            scenes,
            stages
        } = props;

        this.name = name;
        this.description = description;

        this.current = {
            scene: scenes ? scenes[0] : undefined,
            stage: scenes ? scenes[0].stage : undefined
        };

        this.stages = stages || [];
        this.scenes = scenes || [];

        for (const stage of this.stages) {
            stage.game = this;
        }

        for (const scene of this.scenes) {
            scene.game = this;
        }
    }

    public get currentScene(): Game.Scene | undefined {
        return this.current.scene;
    }

    public get currentStage(): Game.Stage | undefined {
        return this.current.stage;
    }
}

export default GameCore;