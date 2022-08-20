import * as THREE from "three";
import { Game } from "..";

class Core {
    public stages: Game.Stage[];
    public scenes: Game.Scene[];

    public currentScene: Game.Scene;
    public currentStage: Game.Stage;

    constructor(scenes?: Game.Scene[], stages?: Game.Stage[]) {
        const stage1 = new Game.Stage("Stage 1", this);
        const scene1 = new Game.Scene("Scene 1", this);

        const stage2 = new Game.Stage("Stage 2", this);
        const scene2 = new Game.Scene("Scene 2", this);

        [scene1, scene2].forEach(scene => {
            scene.background = Game.Scene.DEFAULT_BACKGROUND;
            scene.environment = Game.Scene.DEFAULT_ENVIRONMENT;
            scene.fog = Game.Scene.DEFAULT_FOG;
        });

        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        const box = new THREE.BoxGeometry(1, 1, 1);
        const cube = new THREE.Mesh(box, material);

        const ball =  new THREE.SphereGeometry(1, 50, 50);
        const sphere = new THREE.Mesh(ball, material);

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

export default Core;