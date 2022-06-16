import * as THREE from "three";
import { OrbitControls, TransformControls } from "three-controls";

class Screen {
    private webGLRenderer: THREE.WebGLRenderer;
    public container: HTMLElement;
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public orbitControls: OrbitControls;
    public transformControls: TransformControls;
    
    constructor(container: HTMLElement) {
        this.container = container;
        this.scene = new THREE.Scene();
        
        this.webGLRenderer = new THREE.WebGLRenderer();
        this.webGLRenderer.setPixelRatio(window.devicePixelRatio);
        this.webGLRenderer.setSize(container.offsetWidth, container.offsetHeight);
        
        container.appendChild(this.webGLRenderer.domElement);
        
        const fov = 75;
        const aspect = this.webGLRenderer.domElement.offsetWidth/this.webGLRenderer.domElement.offsetHeight;
        const near = 0.1;
        const far = 1000;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        this.orbitControls = new OrbitControls(this.camera, this.webGLRenderer.domElement);
        this.transformControls = new TransformControls(this.camera, this.webGLRenderer.domElement);
        
        const x = 0;
        const y = 10;
        const z = 10;
        this.camera.position.set(x, y, z);
        this.orbitControls.update();
        
        window.addEventListener("resize", this.onResize);
        const resizeObserver = new ResizeObserver(this.onResize);
        resizeObserver.observe(container);
    }
   
    private onResize = (): void => {
        this.webGLRenderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.camera.aspect = this.webGLRenderer.domElement.offsetWidth/this.webGLRenderer.domElement.offsetHeight;
        this.camera.updateProjectionMatrix();
    }
    
    public get renderer(): THREE.WebGLRenderer {
        return this.webGLRenderer;
    }
    
    public set renderer(newRenderer: THREE.WebGLRenderer) {
        this.container.removeChild(this.webGLRenderer.domElement); // First, we remove the old canvas.
        
        this.webGLRenderer = newRenderer;
        this.webGLRenderer.setPixelRatio(window.devicePixelRatio);
        this.webGLRenderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        
        this.orbitControls = new OrbitControls(this.camera, this.webGLRenderer.domElement);
        this.transformControls = new TransformControls(this.camera, this.webGLRenderer.domElement);
        // The controls need to be updated when the renderer changes.
        
        this.camera.aspect = this.webGLRenderer.domElement.offsetWidth/this.webGLRenderer.domElement.offsetHeight;
        this.container.appendChild(this.webGLRenderer.domElement);
    }
    
    public get canvas(): HTMLCanvasElement {
        return this.renderer.domElement;
    }
    
    public animate(callback?: () => void) {
        const startAnimation = () => {
            requestAnimationFrame(startAnimation);
            this.orbitControls.update();
            
            if (callback) {
                callback();
            }
            
            this.webGLRenderer.render(this.scene, this.camera);    
            this.webGLRenderer.autoClear = true;
        }
        
        startAnimation();
    }
}

export default Screen;