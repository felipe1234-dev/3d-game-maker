import * as THREE from "three";
import * as Editor from "./index";
import * as Game from "../Game";

class Core {
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
        
        this.renderer = new Editor.Renderer(this);
        
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

        this.addGrids();
    }

    protected addGrids() {
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

        this.game.currentScene.add(group);
        this.grids.group = group;
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
        const group = this.grids.group;
        if (!group) {
            return;
        }

        this.game.currentScene.remove(group);

        this.grids.children[0].size = value;
        this.grids.children[0].divisions = value;

        this.grids.children[1].size = value;
        this.grids.children[1].divisions = value / 5;

        this.addGrids();
    }
}

export default Core;