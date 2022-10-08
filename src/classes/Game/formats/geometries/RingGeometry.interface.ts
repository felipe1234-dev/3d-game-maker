import { Geometry, isGeometry } from "./Geometry.interface";

interface RingGeometry extends Geometry {
    type: "RingGeometry";
    innerRadius: number;
    outerRadius: number;
    thetaSegments: number;
    phiSegments: number;
    thetaStart: number;
    thetaLength: number;
}

function isRingGeometry(json: any): json is RingGeometry {
    const isGeo = isGeometry(json);
    const isType = json.type === "RingGeometry";
    
    const isInnerRadius = typeof json.innerRadius === "number";
    const isOuterRadius = typeof json.outerRadius === "number";

    const isThetaSegments = typeof json.radialSegments === "number";
    const isPhiSegments = typeof json.heightSegments === "number";

    const isThetaStart = typeof json.thetaStart === "number";
    const isThetaLength = typeof json.thetaLength === "number";

    return (
        isGeo &&
        isType &&
        
        isInnerRadius &&
        isOuterRadius &&

        isThetaSegments &&
        isPhiSegments &&

        isThetaStart &&
        isThetaLength
    );
}

export type { RingGeometry };
export { isRingGeometry };