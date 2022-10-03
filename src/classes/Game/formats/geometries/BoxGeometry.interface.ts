import GeometryFormat from "./Geometry.interface";

interface BoxGeometry extends GeometryFormat {
    type: "BoxGeometry";
    width: number;
    height: number;
    depth: number;
    widthSegments: number;
    heightSegments: number;
    depthSegments: number;
}

export default BoxGeometry;