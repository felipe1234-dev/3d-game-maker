import * as THREE from "three";
import * as Editor from "./index";
import * as Game from "../Game";

class EditorCore {
    public game: Game.Core;
    public renderer: Editor.Renderer;
    public camera: THREE.PerspectiveCamera;
    public orbitControls: Editor.Orbit;
    public transformControls: Editor.Transform;

    public grids: {
        show: boolean;
        group: THREE.Group | null;
        children: Array<{
            size: number;
            divisions: number;
            colorCenterLine: string;
            colorGrid: string;
            ref: THREE.GridHelper | null;
        }>
    };
    
    constructor(game: Game.Core) {
        this.game = game;
        
        this.renderer = new Editor.Renderer(this, { antialias: true });
        
        const fov = 75;
        const { offsetWidth: canvasWidth, offsetHeight: canvasHeight } = this.renderer.canvas;
        const aspect = canvasWidth/canvasHeight;
        const near = 0.1;
        const far = 1000;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        
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

        this.grids = {
            show: true,
            group: null,
            children: [
                {
                    size: 30, 
                    divisions: 30,
                    colorGrid: "#888888",
                    colorCenterLine: "#444444",
                    ref: null
                },
                {
                    size: 30,
                    divisions: 6,
                    colorGrid: "#222222",
                    colorCenterLine: "#444444",
                    ref: null
                }
            ]
        };

        this.createGrids();

        const updateGravityHelper = () => {

        };

        this.game.addEventListener("changeScene", evt => {
            const currentScene = evt.currentScene as Game.Scene;
            const previousScene = evt.previousScene as Game.Scene;

            if (!currentScene.physics.hasEventListener("editGravity", updateGravityHelper)) {
                currentScene.physics.addEventListener("editGravity", updateGravityHelper);
            }

            const group = this.grids.group;
            if (!group) {
                return;
            }

            previousScene.remove(group);
            currentScene.add(group);
        });
    }

    public createGrids(): void {
        if (!this.game.current.scene) {
            return;
        }

        const group = new THREE.Group();
    
        this.grids.children.forEach((grid, i) => {
            const childGrid = new THREE.GridHelper(
                grid.size, 
                grid.divisions,
                grid.colorCenterLine,
                grid.colorGrid    
            );

            group.add(childGrid);
            this.grids.children[i].ref = childGrid;
        });

        this.game.current.scene.add(group);
        this.grids.group = group;
        this.showGrids = this.showGrids;
    }

    public destroyGrids(): void {
        if (!this.game.current.scene) {
            return;
        }
        
        const group = this.grids.group;
        if (!group) {
            return;
        }

        this.game.current.scene.remove(group);
    }

    get showGrids(): boolean {
        return this.grids.show;
    }

    set showGrids(value: boolean) {
        const group = this.grids.group;
        if (!group) {
            return;
        }

        group.visible = value;
        this.grids.show = value;
    }

    get gridSize() {
        return this.grids.children[0].size;
    }

    set gridSize(value) {
        if (!this.game.current.scene) {
            return;
        }

        const group = this.grids.group;
        if (!group) {
            return;
        }

        this.destroyGrids();

        this.grids.children[0].size = value;
        this.grids.children[0].divisions = value;

        this.grids.children[1].size = value;
        this.grids.children[1].divisions = value / 5;

        this.createGrids();
    }
}

export default EditorCore;