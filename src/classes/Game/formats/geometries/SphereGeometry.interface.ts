import { Geometry, isGeometry } from "./Geometry.interface";

interface SphereGeometry extends Geometry {
    type: "SphereGeometry";
    radius: number;
    widthSegments: number;
    heightSegments: number;
    phiStart: number;
    phiLength: number;
    thetaStart: number;
    thetaLength: number;
}

function isSphereGeometry(json: any): json is SphereGeometry {
    const isGeo = isGeometry(json);
    const isType = json.type === "SphereGeometry";
    
    const isRadius = typeof json.radius === "number";

    const isWidthSegments = typeof json.widthSegments === "number";
    const isHeightSegments = typeof json.heightSegments === "number";

    const isPhiStart = typeof json.phiStart === "number";
    const isPhiLength = typeof json.phiLength === "number";

    const isThetaStart = typeof json.thetaStart === "number";
    const isThetaLength = typeof json.thetaLength === "number";

    return (
        isGeo &&
        isType &&
        
        isRadius &&
        
        isWidthSegments &&
        isHeightSegments &&

        isPhiStart &&
        isPhiLength &&

        isThetaStart &&
        isThetaLength
    );
}

export type { SphereGeometry };
export { isSphereGeometry };