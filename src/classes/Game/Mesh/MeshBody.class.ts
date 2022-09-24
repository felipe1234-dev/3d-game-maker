import * as CANNON from "cannon-es";
import MeshCore from "./MeshCore.class";
import { threeToCannon } from "three-to-cannon";

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

    public toJSON(): any {
        return {};
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
            this.removeShape(shape);
        }

        const result = threeToCannon(this.mesh);
        if (!result) return;
        
        const { shape } = result;
        if (shape) this.addShape(shape);
    }
}

export default MeshBody;