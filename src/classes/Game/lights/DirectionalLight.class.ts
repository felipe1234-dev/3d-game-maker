import * as THREE from "three";
import { Game } from "@local/classes";
import {
    generateID,
    applyObject3DJSON,
    parseObjectChildren
} from "../utils";

interface DirectionalLightOptions {
    id?: number;
    uuid?: string;
    color?: THREE.ColorRepresentation;
    intensity?: number;
}

class DirectionalLight extends THREE.DirectionalLight implements Game.Object3D {
    public readonly type: "DirectionalLight";
    public readonly receiveShadow: boolean;
    public helper: THREE.DirectionalLightHelper;

    constructor(
        options: DirectionalLightOptions = {}
    ) {
        const {
            id = generateID(),
            uuid = THREE.MathUtils.generateUUID(),
            color = "#fff",
            intensity = 1
        } = options;
        super(color, intensity);

        this.id = id;
        this.uuid = uuid;
        this.type = "DirectionalLight";

        this.helper = new THREE.DirectionalLightHelper(this);
        this.helper.visible = false;

        this.receiveShadow = false;
        this.castShadow = true;
    }

    public override toJSON(
        meta?: Game.Formats.Meta
    ): Game.Formats.DirectionalLight {
        return super.toJSON(meta ? {
            geometries: {},
            materials: {},
            textures: {},
            images: {},
            ...meta
        } : undefined);
    }

    public static fromJSON(
        json: Game.Formats.DirectionalLight
    ): DirectionalLight {
        const light = new DirectionalLight(json.object);

        applyObject3DJSON(light, json);
        parseObjectChildren(light, json);

        return light;
    }
}

export default DirectionalLight;
export type { DirectionalLightOptions };