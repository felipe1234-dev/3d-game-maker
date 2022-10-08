import { Geometry, isGeometry } from "./Geometry.interface";

interface CircleGeometry extends Geometry {
    type: "CircleGeometry";
    radius: number;
    segments: number;
    thetaStart: number;
    thetaLength: number;
}

function isCircleGeometry(json: any): json is CircleGeometry {
    const isGeo = isGeometry(json);
    const isType = json.type === "CircleGeometry";
    const isRadius = typeof json.radius === "number";
    const isThetaStart = typeof json.thetaStart === "number";
    const isSegments = typeof json.segments === "number";
    const isThetaLength = typeof json.thetaLength === "number";

    return (
        isGeo &&
        isType &&
        isRadius &&
        isThetaStart &&
        isSegments &&
        isThetaLength
    );
}

export type { CircleGeometry };
export { isCircleGeometry };