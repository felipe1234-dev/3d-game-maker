import * as THREE from "three";
import { Game } from "@local/classes";
import {
    generateID,
    applyObject3DJSON,
    parseObjectChildren
} from "../utils";

interface HemisphereLightOptions {
    id?: number;
    uuid?: string;
    skyColor?: THREE.ColorRepresentation,
    groundColor?: THREE.ColorRepresentation,
    intensity?: number
}

class HemisphereLight extends THREE.HemisphereLight implements Game.Object3D {
    public readonly type: "HemisphereLight";
    public readonly castShadow: boolean;
    public readonly receiveShadow: boolean;
    public helper: THREE.HemisphereLightHelper;

    constructor(
        options: HemisphereLightOptions = {}
    ) {
        const {
            id = generateID(),
            uuid = THREE.MathUtils.generateUUID(),
            skyColor,
            groundColor,
            intensity
        } = options;
        super(skyColor, groundColor, intensity);

        this.id = id;
        this.uuid = uuid;
        this.type = "HemisphereLight";

        this.helper = new THREE.HemisphereLightHelper(this, 1);
        this.helper.visible = false;

        this.castShadow = false;
        this.receiveShadow = false;
    }

    public set skyColor(skyColor: THREE.ColorRepresentation) {
        this.color = new THREE.Color(skyColor);
    }

    public get skyColor(): THREE.Color {
        return this.color;
    }

    public override toJSON(
        meta?: Game.Formats.Meta
    ): Game.Formats.HemisphereLight {
        return super.toJSON(meta ? {
            geometries: {},
            materials: {},
            textures: {},
            images: {},
            ...meta
        } : undefined);
    }

    public static fromJSON(
        json: Game.Formats.HemisphereLight
    ): HemisphereLight {
        const light = new HemisphereLight(json.object);

        applyObject3DJSON(light, json);
        parseObjectChildren(light, json);

        return light;
    }
}

export default HemisphereLight;
export type { HemisphereLightOptions };