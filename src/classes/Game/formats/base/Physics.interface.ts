interface Physics {
    gravity: [
        x: number,
        y: number,
        z: number,
    ];
    frictionGravity?: [
        x: number,
        y: number,
        z: number,
    ];
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
        Array.isArray(json.gravity) &&
        json.gravity.length === 3 &&
        json.gravity.every((item: any) => typeof item === "number");

    const hasFrictionGravity = !!json.frictionGravity;
    const isFrictionGravity =
        Array.isArray(json.frictionGravity) &&
        json.frictionGravity.length === 3 &&
        json.frictionGravity.every((item: any) => typeof item === "number");

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