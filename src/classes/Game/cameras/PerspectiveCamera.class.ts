import { Game } from "@local/classes";
import { applyObject3DJSON, parseObjectChildren } from "../utils/private";
import * as THREE from "three";

class PerspectiveCamera extends THREE.PerspectiveCamera implements Game.Camera {
    public readonly type: "PerspectiveCamera" = "PerspectiveCamera";
    public game?: Game.Core;

    public override toJSON(
        meta?: Game.Formats.Meta
    ): Game.Formats.PerspectiveCamera {
        return super.toJSON(meta);
    }

    public static fromJSON(
        json: Game.Formats.PerspectiveCamera,
        meta?: Game.Formats.Meta
    ): PerspectiveCamera {
        const camera = new PerspectiveCamera(
            json.object.fov,
            json.object.aspect,
            json.object.near,
            json.object.far
        );

        camera.id = json.object.id;
        camera.uuid = json.object.uuid;
        camera.name = json.object.name || "";

        camera.zoom = json.object.zoom;
        camera.focus = json.object.focus;

        if (json.object.view) {
            camera.view = json.object.view;
        }

        camera.filmGauge = json.object.filmGauge;
        camera.filmOffset = json.object.filmOffset;

        applyObject3DJSON(camera, json);
        parseObjectChildren(camera, json, meta);

        return camera;
    }
}

export default PerspectiveCamera;