import { Body } from "./Body.interface";
import TextureFormat from "./Texture.interface";
import { Source, isSource } from "./Source.interface";
import { Geometry, isGeometry } from "../geometries/Geometry.interface";
import MaterialFormat from "../materials/Material.interface";

interface Meta {
    geometries?: {
        [uuid: string]: Geometry;
    };
    materials?: {
        [uuid: string]: MaterialFormat;
    };
    textures?: {
        [uuid: string]: TextureFormat;
    };
    images?: {
        [uuid: string]: Source;
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
        [uuid: string]: Body;
    };
}

function isMeta(json: any): json is Meta {
    if (!(json instanceof Object)) return false;

    if (json.geometries) {
        const geometries = Object.values(json.geometries);

        for (const geo of geometries) {
            if (!isGeometry(geo)) return false;
        }
    }

    if (json.images) {
        const images = Object.values(json.images);

        for (const img of images) {
            if (!isSource(img)) return false;
        }
    }

    return true;
}

export type { Meta };
export { isMeta };