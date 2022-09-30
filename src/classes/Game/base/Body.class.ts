import * as THREE from "three";
import * as CANNON from "cannon-es";
import { Game } from "@local/classes";
import { threeToCannon } from "three-to-cannon";

interface BodyOptions {
    id?: number;
    uuid?: string;
    mesh?: Game.Mesh;
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
}

class Body extends CANNON.Body {
    public readonly id: number;
    public readonly uuid: string;
    public mesh?: Game.Mesh;

    constructor(options: BodyOptions = {}) {
        const {
            id = Game.Utils.generateID(),
            uuid = THREE.MathUtils.generateUUID(),
            mesh,
            ...rest
        } = options;
        super(rest);

        this.id = id;
        this.uuid = uuid;
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
            this.removeShape(shape);
        }

        const result = threeToCannon(this.mesh);
        if (!result) return;

        const { shape } = result;
        if (shape) this.addShape(shape);
    }
}

export default Body;
export type { BodyOptions };