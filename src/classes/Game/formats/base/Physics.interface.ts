interface Physics {
    gravity?: {
        x: number;
        y: number;
        z: number;
    };
    frictionGravity?: {
        x: number;
        y: number;
        z: number;
    };
    allowSleep?: boolean;
    broadphase?: {
        useBoundingBoxes: boolean;
        dirty: boolean;
    };
    quatNormalizeFast?: boolean;
    quatNormalizeSkip?: number;
}

export default Physics;