import { Geometry, isGeometry } from "./Geometry.interface";

interface DodecahedronGeometry extends Geometry {
    type: "DodecahedronGeometry";
    radius: number;
    detail: number;
}

function isDodecahedronGeometry(json: any): json is DodecahedronGeometry {
    const isGeo = isGeometry(json);
    const isType = json.type === "DodecahedronGeometry";
    
    const isRadius = typeof json.radius === "number";
    const isDetail = typeof json.detail === "number";

    return (
        isGeo &&
        isType &&
        
        isRadius &&
        isDetail
    );
}

export type { DodecahedronGeometry };
export { isDodecahedronGeometry };