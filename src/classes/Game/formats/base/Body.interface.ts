import * as CANNON from "cannon-es";

interface Body {
    id: number;
    uuid: string;
    mesh?: string;
    collisionFilterGroup: number;
    collisionFilterMask: number;
    collisionResponse: boolean;
    position: {
        x: number;
        y: number;
        z: number;
    };
    velocity: {
        x: number;
        y: number;
        z: number;
    };
    mass: number;
    material?: {
        friction: number;
        restitution: number;
    };
    linearDamping: number;
    type: CANNON.BodyType;
    allowSleep: boolean;
    sleepSpeedLimit: number;
    sleepTimeLimit: number;
    quaternion: {
        x: number;
        y: number;
        z: number;
        w: number;
    };
    angularVelocity: {
        x: number;
        y: number;
        z: number;
    };
    fixedRotation: boolean;
    angularDamping: number;
    linearFactor: {
        x: number;
        y: number;
        z: number;
    };
    angularFactor: {
        x: number;
        y: number;
        z: number;
    };
    isTrigger: boolean;
}

function isBody(json: any): json is Body {
    const isObj = json instanceof Object;
    if (!isObj) return false;

    const isID = typeof json.id === "number";
    const isUuid = typeof json.uuid === "string";

    const hasMesh = !!json.mesh;
    const isMesh = typeof json.mesh === "string";

    const isCollisionFilterGroup =
        typeof json.collisionFilterGroup === "number";
    const isCollisionFilterMask = typeof json.collisionFilterMask === "number";
    const isCollisionResponse = typeof json.collisionResponse === "boolean";
    const isPosition =
        Array.isArray(json.position) &&
        json.position.length === 3 &&
        json.position.every((item: any) => typeof item === "number");
    const isVelocity =
        Array.isArray(json.velocity) &&
        json.velocity.length === 3 &&
        json.velocity.every((item: any) => typeof item === "number");
    const isMass = typeof json.mass === "number";

    const hasMaterial = !!json.material;
    const isMaterial = json.material instanceof Object;

    const isLinearDamping = typeof json.linearDamping === "number";
    const isType =
        typeof json.type === "number" &&
        Object.values(CANNON.BODY_TYPES).includes(json.type);
    const isAllowSleep = typeof json.allowSleep === "boolean";
    const isSleepSpeedLimit = typeof json.sleepSpeedLimit === "number";
    const isSleepTimeLimit = typeof json.sleepTimeLimit === "number";
    const isQuaternion =
        Array.isArray(json.quaternion) &&
        json.quaternion.length === 4 &&
        json.quaternion.every((item: any) => typeof item === "number");
    const isAngularVelocity =
        Array.isArray(json.angularVelocity) &&
        json.angularVelocity.length === 3 &&
        json.angularVelocity.every((item: any) => typeof item === "number");
    const isAngularFactor =
        Array.isArray(json.angularFactor) &&
        json.angularFactor.length === 3 &&
        json.angularFactor.every((item: any) => typeof item === "number");
    const isLinearFactor =
        Array.isArray(json.linearFactor) &&
        json.linearFactor.length === 3 &&
        json.linearFactor.every((item: any) => typeof item === "number");

    const isFixedRotation = typeof json.fixedRotation === "boolean";
    const isAngularDamping = typeof json.angularDamping === "number";
    const isIsTrigger = typeof json.isTrigger === "boolean";

    return (
        isID &&
        isUuid &&
        (hasMesh ? isMesh : true) &&
        isCollisionFilterGroup &&
        isCollisionFilterMask &&
        isCollisionResponse &&
        isPosition &&
        isVelocity &&
        isMass &&
        (hasMaterial ? isMaterial : true) &&
        isLinearDamping &&
        isType &&
        isAllowSleep &&
        isSleepSpeedLimit &&
        isSleepTimeLimit &&
        isQuaternion &&
        isAngularVelocity &&
        isAngularFactor &&
        isLinearFactor &&
        isFixedRotation &&
        isAngularDamping &&
        isIsTrigger
    );
}

export type { Body };
export { isBody };