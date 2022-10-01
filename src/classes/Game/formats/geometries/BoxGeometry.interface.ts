import GeometryFormat from "../base/Geometry.interface";

interface BoxGeometry extends GeometryFormat {
    width: number;
    height: number;
    depth: number;
    widthSegments: number;
    heightSegments: number;
    depthSegments: number;
}

export default BoxGeometry;