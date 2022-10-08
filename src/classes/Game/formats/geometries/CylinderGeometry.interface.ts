import { Geometry, isGeometry } from "./Geometry.interface";

interface CylinderGeometry extends Geometry {
    type: "CylinderGeometry";
    radiusTop: number;
    radiusBottom: number;
    height: number;
    radialSegments: number;
    heightSegments: number;
    openEnded: boolean;
    thetaStart: number;
    thetaLength: number;
}

function isCylinderGeometry(json: any): json is CylinderGeometry {
    const isGeo = isGeometry(json);
    const isType = json.type === "CylinderGeometry";
    
    const isRadiusTop = typeof json.radiusTop === "number";
    const isRadiusBottom = typeof json.radiusBottom === "number";
    
    const isHeight = typeof json.height === "number";

    const isRadialSegments = typeof json.radialSegments === "number";
    const isHeightSegments = typeof json.heightSegments === "number";
    
    const isOpenEnded = typeof json.openEnded === "boolean";

    const isThetaStart = typeof json.thetaStart === "number";
    const isThetaLength = typeof json.thetaLength === "number";

    return (
        isGeo &&
        isType &&
        
        isRadiusTop &&
        isRadiusBottom &&

        isHeight &&

        isRadialSegments &&
        isHeightSegments &&
        
        isOpenEnded &&

        isThetaStart &&
        isThetaLength
    );
}

export type { CylinderGeometry };
export { isCylinderGeometry };