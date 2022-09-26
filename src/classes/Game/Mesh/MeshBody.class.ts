import * as THREE from "three";
import * as CANNON from "cannon-es";
import { Game } from "../..";
import { threeToCannon } from "three-to-cannon";

class MeshBody extends CANNON.Body {
    public readonly id: number;
    public readonly uuid: string;
    public mesh?: Game.Mesh;

    constructor(options?: Game.BodyOptions) {
        const { mesh, ...rest } = options || {};
        super(rest);

        this.id = new Date().valueOf();
        this.uuid = THREE.MathUtils.generateUUID();
        this.mesh = mesh;
    }

    public toJSON(): Game.BodyFormat {
        const json: Game.BodyFormat = {
            id: this.id,
            uuid: this.uuid,

            collisionFilterGroup: this.collisionFilterGroup,
            collisionFilterMask: this.collisionFilterMask,
            collisionResponse: this.collisionResponse,
            position: {
                x: this.position.x,
                y: this.position.y,
                z: this.position.z,
            },
            velocity: {
                x: this.velocity.x,
                y: this.velocity.y,
                z: this.velocity.z,
            },
            mass: this.mass,
            linearDamping: this.linearDamping,
            type: this.type,
            allowSleep: this.allowSleep,
            sleepSpeedLimit: this.sleepSpeedLimit,
            sleepTimeLimit: this.sleepTimeLimit,
            quaternion: {
                x: this.quaternion.x,
                y: this.quaternion.y,
                z: this.quaternion.z,
                w: this.quaternion.w,
            },
            angularVelocity: {
                x: this.angularVelocity.x,
                y: this.angularVelocity.y,
                z: this.angularVelocity.z,
            },
            fixedRotation: this.fixedRotation,
            angularDamping: this.angularDamping,
            linearFactor: {
                x: this.linearFactor.x,
                y: this.linearFactor.y,
                z: this.linearFactor.z,
            },
            angularFactor: {
                x: this.angularFactor.x,
                y: this.angularFactor.y,
                z: this.angularFactor.z,
            },
            isTrigger: this.isTrigger,
        };

        if (this.mesh) json.mesh = this.mesh.uuid;
        if (this.material) {
            json.material = {
                friction: this.material.friction,
                restitution: this.material.restitution,
            };
        }

        return json;
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