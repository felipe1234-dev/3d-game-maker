import * as THREE from "three";
import * as Editor from "./index";
import * as Game from "../Game";
import GravityHelper from "./Helpers/GravityHelper.class";
import GridsHelper from "./Helpers/GridsHelper.class";
import VertexHelper from "./Helpers/VertexHelper.class";

class EditorCore {
    public game: Game.Core;
    public renderer: Editor.Renderer;
    public camera: THREE.PerspectiveCamera;
    public orbitControls: Editor.Orbit;
    public transformControls: Editor.Transform;

    public gridsHelper: GridsHelper;
    public gravityHelper: GravityHelper;
    public vertexHelper: VertexHelper;
    
    constructor(game: Game.Core) {
        this.game = game;
        
        this.renderer = new Editor.Renderer(this, { antialias: true });
        
        const fov = 75;
        const { offsetWidth: canvasWidth, offsetHeight: canvasHeight } = this.renderer.canvas;
        const aspect = canvasWidth/canvasHeight;
        const near = 0.1;
        const far = 1000;
        this.camera = new THREE.PerspectiveCamera(
            fov, 
            aspect, 
            near, 
            far
        );
        
        this.orbitControls = new Editor.Orbit(
            this.camera, 
            this.renderer.canvas,
            this
        );
        this.transformControls = new Editor.Transform(
            this.camera, 
            this.renderer.canvas,
            this
        );

        this.gridsHelper = new GridsHelper(this);
        this.gravityHelper = new GravityHelper(this, this.gridsHelper.parameters.size);
        this.vertexHelper = new VertexHelper("#62dafb", this);
        
        this.transformControls.addToBlacklist(
            this.gridsHelper,
            this.gravityHelper
        );

        this.game.addEventListener("changeScene", evt => {
            const currentScene = evt.currentScene as Game.Scene;
            const previousScene = evt.previousScene as Game.Scene;
            
            const updateGravityHelper = () => {
                const { x, y, z } = currentScene.physics.gravity;

                this.gravityHelper.gx = x;
                this.gravityHelper.gy = y;
                this.gravityHelper.gz = z;

                this.gravityHelper.needsUpdate = true;
            };

            currentScene.physics.addEventListener(
                "changeGravity", 
                () => updateGravityHelper()
            );
            currentScene.physics.dispatchEvent({
                type: "changeGravity",
                currentGravity: currentScene.physics.gravity,
                previousGravity: currentScene.physics.gravity
            });

            previousScene.remove(this.gravityHelper);
            currentScene.add(this.gravityHelper);

            previousScene.remove(this.gridsHelper);
            currentScene.add(this.gridsHelper);
        });

        this.game.dispatchEvent({
            type: "changeScene",
            currentScene: this.game.currentScene,
            previousScene: this.game.currentScene
        });
    }
}

export default EditorCore;