import * as THREE from "three";
import * as ThreeControls from "@local/three-controls";
import * as Editor from "./index";

class TransformControls extends ThreeControls.TransformControls {
    public core: Editor.Core;
    public readonly raycaster: THREE.Raycaster;
    public readonly mouse: THREE.Vector2;
    public intersected?: THREE.Intersection;
    public helper?: THREE.BoxHelper;
    
    constructor(
        camera: THREE.Camera,
        canvas: HTMLCanvasElement,
        core: Editor.Core
    ) {
        super(camera, canvas);
        this.core = core;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        this.canvas.addEventListener("pointermove", this.onMouseMove, false);
        this.canvas.addEventListener("pointerdown", this.onMouseDown, false);
    }

    public get canvas(): HTMLElement {
        return this.domElement;
    }

    public get gizmos(): Array<THREE.Object3D> {
        if (this.object) {
            const child = this.children[0];

            if (child instanceof ThreeControls.TransformControlsGizmo) {
                return child.gizmo[this.mode].children;
            }

            return [];
        } else {
            return [];
        }
    }

    public get intersects(): Array<THREE.Intersection> {
        const { currentScene } = this.core.game;
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const objects = currentScene.children.filter((object) => (
            !(object instanceof ThreeControls.TransformControls) 
        ));
        const gizmos = this.gizmos;
        
        const intersects = this.raycaster.intersectObjects([
            ...objects,
            ...gizmos
        ], true);

        return intersects;
    }

    protected onMouseMove = (event: PointerEvent): void => {
        const { container } = this.core.renderer;

        if (!container && !this.canvas) {
            return;
        }
        
        if (this.dragging && this.helper) {
            this.helper.update();
        }
        
        const view = container ?? this.canvas;
        
        this.mouse.x = (event.clientX/view.offsetWidth) * 2 - 1;
        this.mouse.y = -(event.clientY/view.offsetHeight) * 2 + 1;

        const intersectedNow = this.intersects[0];
        const intersectedBefore = this.intersected;
        
        if (intersectedBefore === intersectedNow) {
            return;
        }
        
        let cursor = "default";
        
        if (intersectedNow) {
            if (this.gizmos.includes(intersectedNow.object)) {
                cursor = "grab";
            }
            
            if (this.dragging) {
                cursor = "grabbing";
            }
            
            if (intersectedNow.object instanceof THREE.Mesh) {
                cursor = "pointer";
            }
        }
        
        this.canvas.style.cursor = cursor;
        
        if (intersectedBefore && intersectedBefore.object instanceof THREE.Mesh) {
            const material: THREE.Material | Array<THREE.Material> =
                intersectedBefore.object.material;
            const materials: Array<THREE.Material> =
                Array.isArray(material) ? material : [material];

            materials.forEach((material) => {
                const oldOpacity =
                    intersectedBefore.object.userData.opacties[material.uuid];
                material.transparent = true;
                material.opacity = oldOpacity;
                material.needsUpdate = true;
            });

            delete intersectedBefore.object.userData.opacties;
        }

        if (intersectedNow && intersectedNow.object instanceof THREE.Mesh) {
            const material: THREE.Material | Array<THREE.Material> =
                intersectedNow.object.material;
            const materials: Array<THREE.Material> =
                Array.isArray(material) ? material : [material];

            intersectedNow.object.userData.opacties = {};
            materials.forEach((material) => {
                intersectedNow.object.userData.opacties[material.uuid] = material.opacity;
                material.transparent = true;
                material.opacity = 0.5;
                material.needsUpdate = true;
            });
        }
        
        this.intersected = intersectedNow;
    }

    protected onMouseDown = (): void => {
        const currentScene = this.core.game.currentScene;
        
        if (
            !this.intersected && 
            this.object && 
            this.helper
        ) {
            this.detach();
                
            currentScene.remove(this.helper);
            currentScene.remove(this);
                
            this.helper = undefined;
            this.core.orbitControls.enableRotate = true;
                
            this.dispatchEvent({ type: "unselect" });
        } else if (
            this.intersected && 
            this.gizmos.includes(this.intersected.object) &&
            this.helper    
        ) {
            this.canvas.style.cursor = "grabbing";
        } else if (
            this.intersected &&
            !this.object &&
            !this.helper
        ) {
            const boxHelper = new THREE.BoxHelper(this.intersected.object, 0xffff00);
            this.helper = boxHelper;
            
            this.attach(this.intersected.object);
    
            currentScene.add(this);
            currentScene.add(boxHelper);
            
            this.core.orbitControls.enableRotate = false;
            this.dispatchEvent({ type: "select" });
        }
    }
    
    public setMode = (mode: "translate" | "scale" | "rotate"): void => {
        this.mode = mode;
        
        this.dispatchEvent({ type: "set-mode" });
    }
    
    public delete = (): void => {
        if (!this.object) {
            return;
        }
        
        const { game } = this.core;
        const { currentScene } = game;
        
        currentScene.remove(this.object);
        this.detach();

        if (this.helper) {
            currentScene.remove(this.helper);
            this.helper = undefined;
        }

        currentScene.remove(this);
        this.core.orbitControls.enableRotate = true;
        
        this.dispatchEvent({ type: "unselect" });
    }
}

export default TransformControls;