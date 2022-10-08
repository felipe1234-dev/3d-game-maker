import { Geometry, isGeometry } from "./Geometry.interface";

interface ConeGeometry extends Geometry {
    type: "ConeGeometry";
    radius: number;
    height: number;
    radialSegments: number;
    heightSegments: number;
    openEnded: boolean;
    thetaStart: number;
    thetaLength: number;
}

function isConeGeometry(json: any): json is ConeGeometry {
    const isGeo = isGeometry(json);
    const isType = json.type === "ConeGeometry";
    
    const isRadius = typeof json.radius === "number";
    const isHeight = typeof json.height === "number";

    const isRadialSegments = typeof json.radialSegments === "number";
    const isHeightSegments = typeof json.heightSegments === "number";
    
    const isOpenEnded = typeof json.openEnded === "boolean";

    const isThetaStart = typeof json.thetaStart === "number";
    const isThetaLength = typeof json.thetaLength === "number";

    return (
        isGeo &&
        isType &&
        
        isRadius &&
        isHeight &&

        isRadialSegments &&
        isHeightSegments &&
        
        isOpenEnded &&

        isThetaStart &&
        isThetaLength
    );
}

export type { ConeGeometry };
export { isConeGeometry };