import { Geometry, isGeometry } from "./Geometry.interface";

interface TorusKnotGeometry extends Geometry {
    type: "TorusKnotGeometry";
    radius: number;
    tube: number;
    radialSegments: number;
    tubularSegments: number;
    p: number;
    q: number;
}

function isTorusKnotGeometry(json: any): json is TorusKnotGeometry {
    const isGeo = isGeometry(json);
    const isType = json.type === "TorusKnotGeometry";
    
    const isRadius = typeof json.radius === "number";
    const isTube = typeof json.tube === "number";

    const isRadialSegments = typeof json.radialSegments === "number";
    const isTubularSegments = typeof json.tubularSegments === "number";

    const isP = typeof json.p === "number";
    const isQ = typeof json.q === "number";

    return (
        isGeo &&
        isType &&
        
        isRadius &&
        isTube &&

        isRadialSegments &&
        isTubularSegments &&

        isP && isQ
    );
}

export type { TorusKnotGeometry };
export { isTorusKnotGeometry };