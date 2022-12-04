import { Game } from "@local/classes";
import {
    generateID,
    applyObject3DJSON,
    parseObjectChildren
} from "../utils";
import * as THREE from "three";

interface PerspectiveCameraOptions {
    id?: number;
    uuid?: string;
    fov?: number;
    aspect?: number;
    near?: number;
    far?: number;
}

class PerspectiveCamera extends THREE.PerspectiveCamera implements Game.Camera {
    public readonly type: "PerspectiveCamera";
    public helper: THREE.CameraHelper;

    constructor(
        options: PerspectiveCameraOptions = {}
    ) {
        const {
            id = generateID(),
            uuid = THREE.MathUtils.generateUUID(),
            fov = 50,
            aspect = 1,
            near = 0.1,
            far = 2000
        } = options;
        super(fov, aspect, near, far);

        this.id = id;
        this.uuid = uuid;
        this.type = "PerspectiveCamera";
        this.helper = new THREE.CameraHelper(this);
    }

    public override toJSON(
        meta?: Game.Formats.Meta
    ): Game.Formats.PerspectiveCamera {
        return super.toJSON(meta);
    }

    public static fromJSON(
        json: Game.Formats.PerspectiveCamera
    ): PerspectiveCamera {
        const {
            id,
            uuid,
            fov,
            aspect,
            near,
            far
        } = json.object;

        const camera = new PerspectiveCamera({
            id,
            uuid,
            fov,
            aspect,
            near,
            far
        });

        camera.name = json.object.name || "";
        camera.zoom = json.object.zoom;
        camera.focus = json.object.focus;

        if (json.object.view) {
            camera.view = json.object.view;
        }

        camera.filmGauge = json.object.filmGauge;
        camera.filmOffset = json.object.filmOffset;

        applyObject3DJSON(camera, json);
        parseObjectChildren(camera, json);

        return camera;
    }
}

export default PerspectiveCamera;
export type { PerspectiveCameraOptions };