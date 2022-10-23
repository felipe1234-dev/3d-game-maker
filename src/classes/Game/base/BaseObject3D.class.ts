import { Game } from "@local/classes";
import { applyObject3DJSON, parseObjectChildren } from "../utils/private";
import * as THREE from "three";

class Object3D extends THREE.Object3D implements Game.Object3D {
    public readonly type: "BaseObject3D" = "BaseObject3D";

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

    public static fromJSON(json: Game.Formats.Object3D): Object3D {
        const object = new Object3D();

        applyObject3DJSON(object, json);
        parseObjectChildren(object, json);

        return object;
    }
}

export default Object3D;