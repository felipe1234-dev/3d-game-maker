interface Physics {
    gravity: {
        x: number;
        y: number;
        z: number;
    };
    frictionGravity?: {
        x: number;
        y: number;
        z: number;
    };
    allowSleep: boolean;
    broadphase: {
        useBoundingBoxes: boolean;
        dirty: boolean;
    };
    quatNormalizeFast: boolean;
    quatNormalizeSkip: number;
}

function isPhysics(json: any): json is Physics {
    if (!(json instanceof Object)) return false;

    const isGravity =
        json.gravity instanceof Object &&
        typeof json.gravity.x === "number" &&
        typeof json.gravity.y === "number" &&
        typeof json.gravity.z === "number";

    const hasFrictionGravity = !!json.frictionGravity;
    const isFrictionGravity =
        json.frictionGravity instanceof Object &&
        typeof json.frictionGravity.x === "number" &&
        typeof json.frictionGravity.y === "number" &&
        typeof json.frictionGravity.z === "number";

    const isAllowSleep = typeof json.allowSleep === "boolean";
    const isQuatNormalizeFast = typeof json.quatNormalizeFast === "boolean";
    const isQuatNormalizeSkip = typeof json.quatNormalizeSkip === "number";

    const isBroadphase =
        json.broadphase instanceof Object &&
        typeof json.broadphase.useBoundingBoxes === "boolean" &&
        typeof json.broadphase.dirty === "boolean";

    return (
        isGravity &&
        (hasFrictionGravity ? isFrictionGravity : true) &&
        isAllowSleep &&
        isQuatNormalizeFast &&
        isQuatNormalizeSkip &&
        isBroadphase
    );
}

export type { Physics };
export { isPhysics };