import { Geometry, isGeometry } from "./Geometry.interface";

interface PlaneGeometry extends Geometry {
    type: "PlaneGeometry";
    width: number;
    height: number;
    widthSegments: number;
    heightSegments: number;
}

function isPlaneGeometry(json: any): json is PlaneGeometry {
    const isGeo = isGeometry(json);
    const isType = json.type === "PlaneGeometry";

    const isWidth = typeof json.width === "number";
    const isHeight = typeof json.height === "number";

    const isWidthSegments = typeof json.widthSegments === "number";
    const isHeightSegments = typeof json.heightSegments === "number";

    return (
        isGeo &&
        isType &&
        
        isWidth &&
        isHeight &&

        isWidthSegments &&
        isHeightSegments
    );
}

export type { PlaneGeometry };
export { isPlaneGeometry };