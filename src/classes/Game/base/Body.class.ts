import * as THREE from "three";
import * as CANNON from "cannon-es";
import { Game } from "@local/classes";
import { generateID } from "../utils/private";
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
            id = generateID(),
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

    public toJSON(): Game.Formats.Body {
        const json: Game.Formats.Body = {
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

    public static fromJSON(json: Game.Formats.Body): Body {
        const {
            position,
            velocity,
            material,
            quaternion,
            angularVelocity,
            angularFactor,
            linearFactor,
            mesh,
            ...rest
        } = json;
        const options: BodyOptions = {
            ...rest,
        };

        {
            const { x, y, z } = position;
            options.position = new CANNON.Vec3(x, y, z);
        }

        {
            const { x, y, z } = velocity;
            options.velocity = new CANNON.Vec3(x, y, z);
        }

        if (material) {
            options.material = new CANNON.Material(material);
        }

        {
            const { x, y, z, w } = quaternion;
            options.quaternion = new CANNON.Quaternion(x, y, z, w);
        }

        {
            const { x, y, z } = angularVelocity;
            options.angularVelocity = new CANNON.Vec3(x, y, z);
        }

        {
            const { x, y, z } = linearFactor;
            options.linearFactor = new CANNON.Vec3(x, y, z);
        }

        {
            const { x, y, z } = angularFactor;
            options.angularFactor = new CANNON.Vec3(x, y, z);
        }

        return new Body(options);
    }
}

export default Body;
export type { BodyOptions };