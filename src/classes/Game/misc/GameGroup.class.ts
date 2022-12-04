import { Game } from "@local/classes";
import {
    applyObject3DJSON,
    generateID,
    parseObjectChildren
} from "../utils";
import * as THREE from "three";

interface GroupOptions {
    id?: number;
    uuid?: string;
}

class Group extends THREE.Group implements Game.Object3D {
    public readonly type: "Group";
    public helper: THREE.BoxHelper;

    constructor(options: GroupOptions = {}) {
        const {
            id = generateID(),
            uuid = THREE.MathUtils.generateUUID()
        } = options;
        super();

        this.id = id;
        this.uuid = uuid;
        this.type = "Group";

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
        json: Game.Formats.Group
    ): Group {
        const group = new Group();

        applyObject3DJSON(group, json);
        parseObjectChildren(group, json);

        return group;
    }
}

export default Group;
export type { GroupOptions };