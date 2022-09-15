import * as THREE from "three";
import * as CANNON from "cannon-es";
import { Editor } from "@local/classes";
import SphericalGrid from "./SphericalGrid.class";

class GravityHelper extends THREE.Mesh {
    public editor: Editor.Core;
    public plane: SphericalGrid;
    public massPoint: THREE.Mesh<THREE.SphereGeometry>;
    public gx: number;
    public gy: number;
    public gz: number;
    public orbitRadius: number;

    constructor(editor: Editor.Core, orbitRadius?: number) {
        super();

        this.editor = editor;
        this.orbitRadius = orbitRadius ?? Infinity;

        const color = "#62dafb";
        const radius = 5;
        const offset = 1;
        const nLines = 8;
        const nCircles = 3;

        this.plane = new SphericalGrid(
            color,
            radius,
            offset,
            nLines,
            nCircles
        );
        this.plane.rotation.x = -Math.PI/2;

        this.add(this.plane);
        
        this.gx = 0;
        this.gy = 0;
        this.gz = 0;

        const geometry = new THREE.SphereGeometry(0.5, 64, 64);
        const material = new THREE.MeshBasicMaterial({ color });
        this.massPoint = new THREE.Mesh(geometry, material);
        this.massPoint.position.set(0, 0, 0);

        this.add(this.massPoint);
    }

    set needsUpdate(bool: boolean) {
        if (!bool) return;

        const gVector = new THREE.Vector3(
            this.gx,
            this.gy,
            this.gz
        );

        const axes = ["x", "y", "z"] as const;
        for (const ax of axes) {
            const value = gVector[ax];

            this.position[ax] = Math.min(Math.abs(value), this.orbitRadius);
            this.position[ax] *= value < 0 ? -1 : +1;
        }

        const center = new THREE.Vector3(0, 0, 0);
        this.lookAt(center);
    }
}

export default GravityHelper;