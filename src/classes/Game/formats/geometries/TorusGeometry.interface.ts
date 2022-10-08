import { Geometry, isGeometry } from "./Geometry.interface";

interface TorusGeometry extends Geometry {
    type: "TorusGeometry";
    radius: number;
    tube: number;
    radialSegments: number;
    tubularSegments: number;
    arc: number;
}

function isTorusGeometry(json: any): json is TorusGeometry {
    const isGeo = isGeometry(json);
    const isType = json.type === "TorusGeometry";
    
    const isRadius = typeof json.radius === "number";
    const isTube = typeof json.tube === "number";

    const isRadialSegments = typeof json.radialSegments === "number";
    const isTubularSegments = typeof json.tubularSegments === "number";

    const isArc = typeof json.arc === "number";

    return (
        isGeo &&
        isType &&
        
        isRadius &&
        isTube &&

        isRadialSegments &&
        isTubularSegments &&

        isArc
    );
}

export type { TorusGeometry };
export { isTorusGeometry };