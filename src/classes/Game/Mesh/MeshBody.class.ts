import * as THREE from "three";
import * as CANNON from "cannon-es";
import MeshCore from "./MeshCore.class";

class MeshBody extends CANNON.Body {
    public mesh?: MeshCore;

    constructor(options?: {
        mesh?: MeshCore,
        collisionFilterGroup?: number;
        collisionFilterMask?: number;
        collisionResponse?: boolean;
        position?: CANNON.Vec3;
        velocity?: CANNON.Vec3;
        mass?: number;
        material?: CANNON.Material;
        linearDamping?: number;
        type?: CANNON.BodyType;
        allowSleep?: boolean;
        sleepSpeedLimit?: number;
        sleepTimeLimit?: number;
        quaternion?: CANNON.Quaternion;
        angularVelocity?: CANNON.Vec3;
        fixedRotation?: boolean;
        angularDamping?: number;
        linearFactor?: CANNON.Vec3;
        angularFactor?: CANNON.Vec3;
        shape?: CANNON.Shape;
        isTrigger?: boolean;
    }) {
        const { mesh, ...rest } = options || {};
        super(rest);

        this.mesh = mesh;
    }

    set needsUpdate(bool: boolean) {
        if (!this.mesh || !bool) {
            return;
        }

        // Copy properties from Mesh

        const { x: px, y: py, z: pz } = this.mesh.position;
        this.position.copy(new CANNON.Vec3(px, py, pz));

        const { x: qx, y: qy, z: qz, w } = this.mesh.quaternion;
        this.quaternion.copy(new CANNON.Quaternion(qx, qy, qz, w));

        for (const shape of this.shapes) {
            const geometry = this.mesh.geometry;

            let newShape: CANNON.Shape | undefined;

            if (geometry instanceof THREE.BoxGeometry) {
            
                const { width: x, height: y, depth: z } = geometry.parameters;
                newShape = new CANNON.Box(new CANNON.Vec3(x/2, y/2, z/2));
            
            } else if (geometry instanceof THREE.CylinderGeometry) {

                const { radiusTop, radiusBottom, height, radialSegments } = geometry.parameters;
                newShape = new CANNON.Cylinder(radiusTop, radiusBottom, height, radialSegments);
            
            } else if (geometry instanceof THREE.PlaneGeometry) {
            
                const { width: x, height: y } = geometry.parameters;
                newShape = new CANNON.Box(new CANNON.Vec3(x/2, y/2, 0.1));
            
            } else if (geometry instanceof THREE.SphereGeometry) {



            }

            this.removeShape(shape);
            if (newShape) this.addShape(newShape);
        }
    }

}

export default MeshBody;