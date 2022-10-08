import { Game } from "@local/classes";
import { applyObject3DJSON, parseObjectChildren } from "../utils/private";
import * as THREE from "three";

class BaseObject3D extends THREE.Object3D implements Game.Object3D {
    public static fromJSON(
        json: Game.Formats.Object3D,
        meta?: Game.Formats.Meta
    ): BaseObject3D {
        const object = new BaseObject3D();

        applyObject3DJSON(object, json);
        parseObjectChildren(object, json, meta);

        return object;
    }
}

export default BaseObject3D;