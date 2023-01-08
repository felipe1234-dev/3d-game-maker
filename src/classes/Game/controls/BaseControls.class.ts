import { Game } from "@local/classes";
import {
    applyObject3DJSON,
    generateID,
    metaFromObjectJSON,
    parseObjectChildren
} from "../utils";
import * as THREE from "three";

class BaseControls extends THREE.Object3D implements Game.Controls {
    public name: string;
    public readonly type: typeof Game.Libs.controls[number];
    public readonly camera: Game.Camera;
    public helper: Game.Helper;
    public children: Game.Object3D[];

    protected constructor(camera?: Game.Camera) {
        super();

        this.id = generateID();
        this.uuid = Game.MathUtils.generateUUID();
        this.name = "BaseControls";
        this.type = "BaseControls";

        camera = camera || new Game.PerspectiveCamera();

        this.children = [];
        this.camera = camera;
        this.add(camera);

        this.helper = new Game.BoxHelper(this);
        this.helper.visible = false;
    }

    public connect(): void { }

    public disconnect(): void { }

    public update(delta: number): void { }

    public toJSON(meta?: Game.Formats.Meta): Game.Formats.Controls {
        const newMeta = {
            geometries: {},
            materials: {},
            textures: {},
            images: {},
            ...meta
        };
        meta = { ...newMeta };

        const json: Game.Formats.Controls = super.toJSON(newMeta);
        json.object.camera = this.camera.uuid;

        return json;
    }

    public static fromJSON(json: Game.Formats.BaseControls): BaseControls {
        const meta = metaFromObjectJSON(json);

        let camera: Game.Camera | undefined = undefined;
        const objects = meta.objects || {};
        const cameraUuid = json.object.camera || "";

        if (objects[cameraUuid]) {
            const cameraJSON = objects[cameraUuid];

            for (const type of Game.Libs.cameras) {
                if (Game.Formats[`is${type}`](cameraJSON)) {
                    // @ts-ignore
                    camera = Game[type].fromJSON(cameraJSON, meta);
                }
            }
        }

        const control = new BaseControls(camera);

        applyObject3DJSON(control, json);
        parseObjectChildren(control, json);

        return control;
    }
}

export default BaseControls;