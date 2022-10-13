import { Game } from "@local/classes";
import {
    BufferAttribute,
    isBufferAttribute,
} from "../base/BufferAttribute.interface";

interface Geometry {
    uuid: string;
    type: typeof Game.Libs.geometries[number];
    name?: string;
    data: {
        attributes?: {
            [name: string]: BufferAttribute;
        };
        index?: BufferAttribute;
        morphAttributes?: {
            [name: string]: BufferAttribute[];
        };
        morphTargetsRelative?: boolean;
        groups?: {
            start: number;
            count: number;
            materialIndex?: number;
        }[];
        boundingSphere?: {
            center: number[];
            radius: number;
        };
    };
    userData?: any;
}

function isGeometry(json: any): json is Geometry {
    if (!(json instanceof Object)) return false;

    if (typeof json.uuid !== "string") return false;

    if (typeof json.type !== "string") return false;

    if (!Game.Libs.geometries.includes(json.type)) return false;

    if (json.name && typeof json.name !== "string") return false;

    if (!(json.data instanceof Object)) return false;

    const { data } = json;

    if (data.attributes) {
        const attributes = Object.values(data.attributes);

        for (const attribute of attributes) {
            if (!isBufferAttribute(attribute)) return false;
        }
    }

    if (data.index && !isBufferAttribute(data.index)) return false;

    if (data.morphAttributes) {
        const morphAttributes = Object.values(data.morphAttributes);

        for (const morphAttribute of morphAttributes) {
            if (!Array.isArray(morphAttribute)) return false;
            if (morphAttribute.some(item => !isBufferAttribute(item)))
                return false;
        }
    }

    if ("morphTargetsRelative" in data) {
        if (typeof data.morphTargetsRelative !== "boolean") return false;
    }

    if (data.groups) {
        if (!Array.isArray(data.groups)) return false;

        for (const group of data.groups) {
            if (!(group instanceof Object)) return false;
            if (typeof group.start !== "number") return false;
            if (typeof group.count !== "number") return false;
            if ("materialIndex" in group) {
                if (typeof group.materialIndex !== "number") return false;
            }
        }
    }

    if (data.boundingSphere) {
        const boundingSphere = data.boundingSphere;

        if (!Array.isArray(boundingSphere.center)) return false;

        for (const item of boundingSphere.center) {
            if (typeof item !== "number") return false;
        }

        if (typeof boundingSphere.radius !== "number") return false;
    }

    if (json.userData) {
        if (!(json.userData instanceof Object)) return false;
    }

    return true;
}

export type { Geometry };
export { isGeometry };