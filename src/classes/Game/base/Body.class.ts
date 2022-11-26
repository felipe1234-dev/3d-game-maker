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
    position?: Game.Vec3;
    velocity?: Game.Vec3;
    mass?: number;
    material?: Game.BodyMaterial;
    linearDamping?: number;
    type?: Game.BodyType;
    allowSleep?: boolean;
    sleepSpeedLimit?: number;
    sleepTimeLimit?: number;
    quaternion?: Game.Quat;
    angularVelocity?: Game.Vec3;
    fixedRotation?: boolean;
    angularDamping?: number;
    linearFactor?: Game.Vec3;
    angularFactor?: Game.Vec3;
    shape?: Game.Shape;
    isTrigger?: boolean;
}

class Body extends CANNON.Body {
    public readonly id: number;
    public readonly uuid: string;
    public mesh?: Game.Mesh;

    constructor(options: BodyOptions = {}) {
        const {
            id = generateID(),
            uuid = Game.MathUtils.generateUUID(),
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
        this.position.copy(new Game.Vec3(px, py, pz));

        const { x: qx, y: qy, z: qz, w } = this.mesh.quaternion;
        this.quaternion.copy(new Game.Quat(qx, qy, qz, w));

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

            position: this.position.toArray(),
            velocity: this.velocity.toArray(),

            mass: this.mass,
            linearDamping: this.linearDamping,
            type: this.type,
            allowSleep: this.allowSleep,
            sleepSpeedLimit: this.sleepSpeedLimit,
            sleepTimeLimit: this.sleepTimeLimit,
            quaternion: this.quaternion.toArray(),
            angularVelocity: this.angularVelocity.toArray(),
            fixedRotation: this.fixedRotation,
            angularDamping: this.angularDamping,
            linearFactor: this.linearFactor.toArray(),
            angularFactor: this.angularFactor.toArray(),
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
            const [x, y, z] = position;
            options.position = new Game.Vec3(x, y, z);
        }

        {
            const [x, y, z] = velocity;
            options.velocity = new Game.Vec3(x, y, z);
        }

        if (material) {
            options.material = new Game.BodyMaterial(material);
        }

        {
            const [x, y, z, w] = quaternion;
            options.quaternion = new Game.Quat(x, y, z, w);
        }

        {
            const [x, y, z] = angularVelocity;
            options.angularVelocity = new Game.Vec3(x, y, z);
        }

        {
            const [x, y, z] = linearFactor;
            options.linearFactor = new Game.Vec3(x, y, z);
        }

        {
            const [x, y, z] = angularFactor;
            options.angularFactor = new Game.Vec3(x, y, z);
        }

        return new Body(options);
    }
}

export default Body;
export type { BodyOptions };