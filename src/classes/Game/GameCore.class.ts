import * as THREE from "three";
import { Game } from "..";

class GameCore {
    public name: string;
    public description: string;

    public stages: Game.Stage[];
    public scenes: Game.Scene[];

    public currentScene: Game.Scene;
    public currentStage: Game.Stage;

    constructor(props: {
        name: string;
        description: string;

        scenes?: Game.Scene[];
        stages?: Game.Stage[];

        useDefaultGame?: boolean;
    }) {
        const {
            name,
            description,
            scenes,
            stages
        } = props;

        this.name = name;
        this.description = description;

        const stage1 = new Game.Stage("Stage 1", this);
        const scene1 = new Game.Scene("Scene 1", this);

        const stage2 = new Game.Stage("Stage 2", this);
        const scene2 = new Game.Scene("Scene 2", this);

        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        const box = new THREE.BoxGeometry(1, 1, 1);
        const cube = new Game.Mesh(box, material);

        const ball =  new THREE.SphereGeometry(1, 50, 50);
        const sphere = new Game.Mesh(ball, material);

        scene1.add(cube);
        scene2.add(sphere);
        
        scene1.stage = stage1;
        scene2.stage = stage2;

        stage1.scenes = [scene1];
        stage2.scenes = [scene2];

        this.stages = stages || [ stage1, stage2 ];
        this.scenes = scenes || [ scene1, scene2 ];

        this.currentScene = this.scenes[0] || scene1;
        this.currentStage = this.scenes[0]?.stage || stage1;


    }
}

export default GameCore;