import { Game } from "@local/classes";
import { applyObject3DJSON, parseObjectChildren } from "../utils/private";
import * as THREE from "three";

class Object3D extends THREE.Object3D implements Game.Object3D {
    public readonly type: "Object3D" = "Object3D";

    public override toJSON(meta?: Game.Formats.Meta): Game.Formats.Object3D {
        const newMeta = meta ? {
            geometries: {},
            materials: {},
            textures: {},
            images: {},
            ...meta
        } : undefined;

        return super.toJSON(newMeta);
    }

    public static fromJSON(
        json: Game.Formats.Object3D,
        meta?: Game.Formats.Meta
    ): Object3D {
        const object = new Object3D();

        applyObject3DJSON(object, json);
        parseObjectChildren(object, json, meta);

        return object;
    }
}

export default Object3D;