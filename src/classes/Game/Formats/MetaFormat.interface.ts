import GeometryFormat from "./GeometryFormat.interface";
import BodyFormat from "./Mesh/BodyFormat.interface";

interface MetaFormat {
    geometries?: {
        [uuid: string]: GeometryFormat;
    };
    materials?: {
        [uuid: string]: any;
    };
    textures?: {
        [uuid: string]: any;
    };
    images?: {
        [uuid: string]: any;
    };
    shapes?: {
        [uuid: string]: any;
    };
    skeletons?: {
        [uuid: string]: any;
    };
    animations?: {
        [uuid: string]: any;
    };
    nodes?: {
        [uuid: string]: any;
    };
    bodies?: {
        [uuid: string]: BodyFormat;
    };
}

export default MetaFormat;