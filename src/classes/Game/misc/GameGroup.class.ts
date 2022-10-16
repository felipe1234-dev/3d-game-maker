import * as THREE from "three";
import { Game } from "@local/classes";
import { applyObject3DJSON, parseObjectChildren } from "../utils/private";

class GameGroup extends THREE.Group implements Game.Object3D {
    public helper: THREE.BoxHelper;

    constructor() {
        super();

        this.helper = new THREE.BoxHelper(this);
        this.helper.visible = false;
    }

    public override toJSON(meta?: Game.Formats.Meta): Game.Formats.Group {
        const json: Game.Formats.Group = super.toJSON(
            meta
                ? {
                    geometries: {},
                    materials: {},
                    textures: {},
                    images: {},
                    ...meta
                }
                : undefined
        );

        if (this.children.length === 0) {
            json.object.children = [];
        }

        return json;
    }

    public static fromJSON(
        json: Game.Formats.Object3D,
        meta?: Game.Formats.Meta
    ): GameGroup {
        const group = new GameGroup();

        applyObject3DJSON(group, json);
        parseObjectChildren(group, json, meta);

        return group;
    }
}

export default GameGroup;