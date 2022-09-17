import * as THREE from "three";
import * as ThreeControls from "@local/three-controls";
import * as Editor from "./index";

export type Mode = "translate" | "scale" | "rotate";

class EditorTransform extends ThreeControls.TransformControls {
    public editor: Editor.Core;
    public readonly raycaster: THREE.Raycaster;
    public readonly mouse: THREE.Vector2;
    public intersected?: THREE.Intersection;
    public helper?: THREE.BoxHelper;
    public blacklist: THREE.Object3D[];
    
    constructor(
        camera: THREE.Camera,
        canvas: HTMLCanvasElement,
        editor: Editor.Core
    ) {
        super(camera, canvas);
        this.editor = editor;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        this.canvas.addEventListener("pointermove", this.onMouseMove, false);
        this.canvas.addEventListener("pointerdown", this.onMouseDown, false);

        this.blacklist = [ this ];
    }

    public addToBlacklist(...objects: THREE.Object3D[]): void {
        this.blacklist.push(...objects);
    }

    public removeFromBlacklist(...objects: THREE.Object3D[]): void {
        this.blacklist = this.blacklist.filter(object => !objects.includes(object));
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
        const { scene: currentScene } = this.editor.game.current;
        if (!currentScene) {
            return [];
        }

        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        const objects = currentScene.children.filter((object) => (
            !this.blacklist.includes(object)
        ));
        const gizmos = this.gizmos;
        
        const intersects = this.raycaster.intersectObjects([
            ...objects,
            ...gizmos
        ], true);

        return intersects;
    }

    protected onMouseMove = (event: PointerEvent): void => {
        const { container } = this.editor.renderer;

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
        const { scene: currentScene } = this.editor.game.current;
        if (!currentScene) {
            return;
        }

        if (
            !this.intersected && 
            this.object && 
            this.helper
        ) {
            this.detach();
                
            currentScene.remove(this.helper);
            currentScene.remove(this);
                
            this.helper = undefined;
            this.editor.orbitControls.enableRotate = true;
                
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
            
            this.editor.orbitControls.enableRotate = false;
            this.dispatchEvent({ type: "select" });
        }
    }
    
    public setMode = (mode: Mode): void => {
        this.mode = mode;
        
        this.dispatchEvent({ type: "setMode", mode });
    }
    
    public delete = (): void => {
        if (!this.object) {
            return;
        }
        
        const { game } = this.editor;
        const { currentScene } = game;
        if (!currentScene) {
            return;
        }

        currentScene.remove(this.object);
        this.detach();

        if (this.helper) {
            currentScene.remove(this.helper);
            this.helper = undefined;
        }

        currentScene.remove(this);
        this.editor.orbitControls.enableRotate = true;
        
        this.dispatchEvent({ type: "unselect" });
    }

    public select = (object: THREE.Object3D): void => {
        const { scene: currentScene } = this.editor.game.current;
        if (!currentScene) {
            return;
        }

        if (
            !this.intersected && 
            this.object && 
            this.helper
        ) {
            this.detach();
                
            currentScene.remove(this.helper);
            currentScene.remove(this);
                
            this.helper = undefined;
            this.editor.orbitControls.enableRotate = true;
                
            this.dispatchEvent({ type: "unselect" });
        }

        const boxHelper = new THREE.BoxHelper(object, 0xffff00);
        this.helper = boxHelper;

        this.attach(object);
        currentScene.add(this);
        currentScene.add(boxHelper);

        this.editor.orbitControls.enableRotate = false;
        this.dispatchEvent({ type: "select" });
    }
}

export default EditorTransform;