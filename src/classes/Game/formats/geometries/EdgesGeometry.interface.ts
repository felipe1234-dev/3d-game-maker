import { Geometry, isGeometry } from "./Geometry.interface";

interface EdgesGeometry extends Geometry {
    type: "EdgesGeometry";
    geometry: Geometry;
    thresholdAngle: number;
}

function isEdgesGeometry(json: any): json is EdgesGeometry {
    return (
        json.type === "EdgesGeometry" &&
        typeof json.thresholdAngle === "number" &&
        isGeometry(json.geometry) &&
        isGeometry(json)
    );
}

export type { EdgesGeometry };
export { isEdgesGeometry };