import { Body } from "./Body.interface";
import { Source, isSource } from "./Source.interface";
import { Texture, isTexture } from "../textures/Texture.interface";
import { Geometry, isGeometry } from "../geometries/Geometry.interface";
import { Material, isMaterial } from "../materials/Material.interface";

interface Meta {
    geometries?: {
        [uuid: string]: Geometry;
    };
    materials?: {
        [uuid: string]: Material;
    };
    textures?: {
        [uuid: string]: Texture;
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

    if (json.textures) {
        const textures = Object.values(json.textures);

        for (const text of textures) {
            if (!isTexture(text)) return false;
        }
    }

    if (json.materials) {
        const materials = Object.values(json.images);

        for (const text of materials) {
            if (!isMaterial(text)) return false;
        }
    }

    return true;
}

export type { Meta };
export { isMeta };