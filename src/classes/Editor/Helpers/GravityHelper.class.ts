import * as THREE from "three";
import SphericalGrid from "./SphericalGrid.class";

class GravityHelper extends THREE.Mesh {
    public plane: SphericalGrid;
    //public pointMass: THREE.Mesh<THREE.SphereGeometry>;

    constructor() {
        super();

        const color = "#62dafb";
        const radius = 8;
        const offset = 3;
        const nLines = 8;
        const nCircles = 3;

        this.plane = new SphericalGrid(
            color,
            radius,
            offset,
            nLines,
            nCircles
        );

        this.add(this.plane);

        /* const sphereGeometry = new THREE.SphereGeometry(0.5, 10, 10);
        const wireframe = new THREE.WireframeGeometry(sphereGeometry);
        const sphereMaterial = new THREE.MeshBasicMaterial({ 
            color,
            wireframe: true,
            opacity: 0.25,
            transparent: true
        });
        const sphere = new THREE.LineSegments(wireframe, sphereMaterial);

        sphere.position.set(0, 0, 0);

        this.add(sphere); */
    }

    set gx(value: number) {
        this.position.x = value;
    }

    set gy(value: number) {
        this.position.y = value;
    }

    set gz(value: number) {
        this.position.z = value;
    }
}

export default GravityHelper;