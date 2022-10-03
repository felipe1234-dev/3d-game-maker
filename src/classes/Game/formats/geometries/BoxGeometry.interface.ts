import { Geometry, isGeometry } from "./Geometry.interface";

interface BoxGeometry extends Geometry {
    type: "BoxGeometry";
    width: number;
    height: number;
    depth: number;
    widthSegments: number;
    heightSegments: number;
    depthSegments: number;
}

function isBoxGeometry(json: any): json is BoxGeometry {
    const isGeo = isGeometry(json);
    const isWidth = typeof json.width === "number";
    const isHeight = typeof json.height === "number";
    const isDepth = typeof json.depth === "number";
    const isDepthSegments = typeof json.depthSegments === "number";
    const isWidthSegments = typeof json.widthSegments === "number";
    const isHeightSegments = typeof json.heightSegments === "number";

    return (
        isGeo &&
        isWidth &&
        isHeight &&
        isDepth &&
        isDepthSegments &&
        isWidthSegments &&
        isHeightSegments &&
        isDepthSegments
    );
}

export type { BoxGeometry };
export { isBoxGeometry };