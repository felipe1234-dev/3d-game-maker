import * as THREE from "three";

class SphericalGrid extends THREE.Object3D {
    public lines: THREE.Line[];
    public circles: THREE.Line[];

    constructor(
        color: THREE.ColorRepresentation,
        radius: number,
        offset: number,
        nLines: number,
        nCircles: number
    ) {
        super();

        this.lines = [];
        this.circles = [];

        const center = new THREE.Vector3(0, 0, 0);
        const lineLength = radius + offset;

        for (let i = 0; i !== nLines; i++) {
            const points = [];

            const angle = 2*Math.PI/nLines * i;
            const origin = center.clone();
            const target = origin.clone();

            origin.x = Math.sin(angle) * lineLength;
            origin.z = Math.cos(angle) * lineLength;

            points.push(origin, target);

            const material = new THREE.LineBasicMaterial({ color });
            const geometry = new THREE.BufferGeometry();
            geometry.setFromPoints(points);
            const line = new THREE.Line(geometry, material);
            
            this.add(line);
            this.lines.push(line);
        }

        const ringLength = radius/nCircles;
        const segments = 64;

        for (let i = 0; i < nCircles; i++) {
            const circleRadius = radius - i*ringLength;
            const points = [];

            for (let j = 0; j < segments; j++) {
                const angle1 = 2*Math.PI/segments * j;
                const angle2 = 2*Math.PI/segments * (j + 1);

                const x1 = Math.sin(angle1) * circleRadius;
                const z1 = Math.cos(angle1) * circleRadius;

                const x2 = Math.sin(angle2) * circleRadius;
                const z2 = Math.cos(angle2) * circleRadius;

                const origin = new THREE.Vector3(x1, 0, z1);
                const target = new THREE.Vector3(x2, 0, z2);

                points.push(origin, target);
            }

            const material = new THREE.LineBasicMaterial({ color });
            const geometry = new THREE.BufferGeometry();
            geometry.setFromPoints(points);
            const circle = new THREE.Line(geometry, material);

            this.add(circle);
            this.circles.push(circle);
        }
    }
}

export default SphericalGrid;