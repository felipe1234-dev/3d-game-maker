import { Geometry, isGeometry } from "./Geometry.interface";

interface PolyhedronGeometry extends Geometry {
    type: "PolyhedronGeometry";
    vertices: number[];
    indices: number[];
    radius: number;
    detail: number;
}

function isPolyhedronGeometry(json: any): json is PolyhedronGeometry {
    const isGeo = isGeometry(json);
    const isType = json.type === "PolyhedronGeometry";

    const isVertices = Array.isArray(json.vertices)
        ? 
            json.vertices.every((vert: any) => (
                typeof vert === "number"
            ))
        : false;

    const isIndices = Array.isArray(json.indices)
        ? 
            json.indices.every((index: any) => (
                typeof index === "number"
            ))
        : false;
    
    const isRadius = typeof json.radius === "number";
    const isDetail = typeof json.detail === "number";

    return (
        isGeo &&
        isType &&
        isVertices &&
        isIndices &&
        isRadius &&
        isDetail
    );
}

export type { PolyhedronGeometry };
export { isPolyhedronGeometry };