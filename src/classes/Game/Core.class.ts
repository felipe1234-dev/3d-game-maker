import * as THREE from "three";
import { Game } from "..";

class Core {
    public stages: Game.Stage[];
    public scenes: Game.Scene[];

    public currentScene: Game.Scene;
    public currentStage: Game.Stage;

    constructor(scenes?: Game.Scene[], stages?: Game.Stage[]) {
        const stage = new Game.Stage("Stage 1", this);
        const scene = new Game.Scene("Scene 1", stage, this);
        
        scene.background = Game.Scene.DEFAULT_BACKGROUND;
        scene.environment = Game.Scene.DEFAULT_ENVIRONMENT;
        scene.fog = Game.Scene.DEFAULT_FOG;

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        
        scene.add(cube);
        
        this.stages = stages || [ stage ];
        this.scenes = scenes || [ scene ];

        this.currentScene = this.scenes[0] || scene;
        this.currentStage = this.scenes[0]?.stage || stage;

        stage.addScene(scene);
    }
}

export default Core;