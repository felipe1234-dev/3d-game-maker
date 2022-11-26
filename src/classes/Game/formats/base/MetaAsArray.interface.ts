import { Body } from "./Body.interface";
import { Object3D, isObject3D } from "./Object3D.interface";
import { Source, isSource } from "./Source.interface";
import { Texture, isTexture } from "../textures/Texture.interface";
import { Geometry, isGeometry } from "../geometries/Geometry.interface";
import { Material, isMaterial } from "../materials/Material.interface";

interface MetaAsArray {
    objects?: Object3D["object"][];
    geometries?: Geometry[];
    materials?: Material[];
    textures?: Texture[];
    images?: Source[];
    shapes?: any[];
    skeletons?: any[];
    animations?: any[];
    nodes?: any[];
    bodies?: Body[];
}

function isMetaAsArray(json: any): json is MetaAsArray {
    if (!(json instanceof Object)) return false;

    if (json.objects) {
        const objects = json.objects;

        for (const object of objects) {
            if (!isObject3D({ object })) return false;
        }
    }

    if (json.geometries) {
        const geometries = json.geometries;

        for (const geo of geometries) {
            if (!isGeometry(geo)) return false;
        }
    }

    if (json.images) {
        const images = json.images;

        for (const img of images) {
            if (!isSource(img)) return false;
        }
    }

    if (json.textures) {
        const textures = json.textures;

        for (const text of textures) {
            if (!isTexture(text)) return false;
        }
    }

    if (json.materials) {
        const materials = json.images;

        for (const text of materials) {
            if (!isMaterial(text)) return false;
        }
    }

    return true;
}

export type { MetaAsArray };
export { isMetaAsArray };