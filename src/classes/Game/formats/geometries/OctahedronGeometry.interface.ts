import { Geometry, isGeometry } from "./Geometry.interface";

interface OctahedronGeometry extends Geometry {
    type: "OctahedronGeometry";
    radius: number;
    detail: number;
}

function isOctahedronGeometry(json: any): json is OctahedronGeometry {
    const isGeo = isGeometry(json);
    const isType = json.type === "OctahedronGeometry";
    
    const isRadius = typeof json.radius === "number";
    const isDetail = typeof json.detail === "number";

    return (
        isGeo &&
        isType &&
        
        isRadius &&
        isDetail
    );
}

export type { OctahedronGeometry };
export { isOctahedronGeometry };