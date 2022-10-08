import { Geometry, isGeometry } from "./Geometry.interface";

interface TetrahedronGeometry extends Geometry {
    type: "TetrahedronGeometry";
    radius: number;
    detail: number;
}

function isTetrahedronGeometry(json: any): json is TetrahedronGeometry {
    const isGeo = isGeometry(json);
    const isType = json.type === "TetrahedronGeometry";
    
    const isRadius = typeof json.radius === "number";
    const isDetail = typeof json.detail === "number";

    return (
        isGeo &&
        isType &&
        
        isRadius &&
        isDetail
    );
}

export type { TetrahedronGeometry };
export { isTetrahedronGeometry };