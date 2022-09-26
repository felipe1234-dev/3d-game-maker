import GeometryFormat from "./Geometry.interface";
import BodyFormat from "./Body.interface";

interface Meta {
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

export default Meta;