import * as THREE from "three";
import * as Editor from "./index";
import * as Game from "../Game";

class Core {
    public game: Game.Core;
    public renderer: Editor.Renderer;
    public camera: THREE.PerspectiveCamera;
    public orbitControls: Editor.OrbitControls;
    public transformControls: Editor.TransformControls;
    
    constructor(game: Game.Core) {
        this.game = game;
        
        this.renderer = new Editor.Renderer(this);
        
        const fov = 75;
        const { offsetWidth: canvasWidth, offsetHeight: canvasHeight } = this.renderer.canvas;
        const aspect = canvasWidth/canvasHeight;
        const near = 0.1;
        const far = 1000;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        
        this.orbitControls = new Editor.OrbitControls(
            this.camera, 
            this.renderer.canvas,
            this
        );
        this.transformControls = new Editor.TransformControls(
            this.camera, 
            this.renderer.canvas,
            this
        );
    }
}

export default Core;