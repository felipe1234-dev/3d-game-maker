import { Geometry, isGeometry } from "./Geometry.interface";

interface CapsuleGeometry extends Geometry {
    type: "CapsuleGeometry";
    radius: number;
    length: number;
    capSegments: number;
    radialSegments: number;
}

function isCapsuleGeometry(json: any): json is CapsuleGeometry {
    const isGeo = isGeometry(json);
    const isType = json.type === "CapsuleGeometry";
    const isRadius = typeof json.radius === "number";
    const isLength = typeof json.length === "number";
    const isCapSegments = typeof json.capSegments === "number";
    const isRadialSegments = typeof json.radialSegments === "number";

    return (
        isGeo &&
        isType &&
        isRadius &&
        isLength &&
        isCapSegments &&
        isRadialSegments
    );
}

export type { CapsuleGeometry };
export { isCapsuleGeometry };