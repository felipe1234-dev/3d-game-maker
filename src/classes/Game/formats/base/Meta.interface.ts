import BodyFormat from "./Body.interface";
import TextureFormat from "./Texture.interface";
import SourceFormat from "./Source.interface";
import GeometryFormat from "../geometries/Geometry.interface";
import MaterialFormat from "./Material.interface";

interface Meta {
    geometries?: {
        [uuid: string]: GeometryFormat;
    };
    materials?: {
        [uuid: string]: MaterialFormat;
    };
    textures?: {
        [uuid: string]: TextureFormat;
    };
    images?: {
        [uuid: string]: SourceFormat;
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