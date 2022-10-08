import { Geometry, isGeometry } from "./Geometry.interface";

interface LatheGeometry extends Geometry {
    type: "LatheGeometry";
    points: Array<[x: number, y: number]>;
    segments: number;
    phiStart: number;
    phiLength: number;
}

function isLatheGeometry(json: any): json is LatheGeometry {
    const isGeo = isGeometry(json);
    const isType = json.type === "LatheGeometry";

    const isPoints = Array.isArray(json.points)
        ? 
            json.points.every((point: any) => (
                Array.isArray(point) && 
                point.length === 2 &&
                typeof point[0] === "number" &&
                typeof point[1] === "number" 
            ))
        : false;
    
    const isSegments = typeof json.segments === "number";
    const isPhiStart = typeof json.phiStart === "number";
    const isPhiLength = typeof json.phiLength === "number";

    return (
        isGeo &&
        isType &&
        isPoints &&
        isSegments &&
        isPhiStart &&
        isPhiLength
    );
}

export type { LatheGeometry };
export { isLatheGeometry };