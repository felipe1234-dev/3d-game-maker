import * as CANNON from "cannon-es";

interface BodyFormat {
    id: number;
    uuid: string;
    mesh?: string;
    collisionFilterGroup?: number;
    collisionFilterMask?: number;
    collisionResponse?: boolean;
    position?: {
        x: number;
        y: number;
        z: number;
    };
    velocity?: {
        x: number;
        y: number;
        z: number;
    };
    mass?: number;
    material?: {
        friction?: number;
        restitution?: number;
    };
    linearDamping?: number;
    type?: CANNON.BodyType;
    allowSleep?: boolean;
    sleepSpeedLimit?: number;
    sleepTimeLimit?: number;
    quaternion?: {
        x: number;
        y: number;
        z: number;
        w: number;
    };
    angularVelocity?: {
        x: number;
        y: number;
        z: number;
    };
    fixedRotation?: boolean;
    angularDamping?: number;
    linearFactor?: {
        x: number;
        y: number;
        z: number;
    };
    angularFactor?: {
        x: number;
        y: number;
        z: number;
    };
    isTrigger?: boolean;
}

export default BodyFormat;