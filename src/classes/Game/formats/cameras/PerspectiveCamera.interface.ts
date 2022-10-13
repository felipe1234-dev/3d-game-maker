import { Object3D, isObject3D } from "../base/Object3D.interface";

interface PerspectiveCamera extends Object3D {
    object: Object3D["object"] & {
        type: "PerspectiveCamera";
        fov: number;
        zoom: number;
        near: number;
        far: number;
        focus: number;
        aspect: number;
        view?: {
            enabled: boolean;
            fullWidth: number;
            fullHeight: number;
            offsetX: number;
            offsetY: number;
            width: number;
            height: number;
        },
        filmGauge: number;
        filmOffset: number;
    };
}

function isPerspectiveCamera(json: any): json is PerspectiveCamera {
    if (!(json instanceof Object)) return false;
    if (!(json.object instanceof Object)) return false;

    if (json.object.type !== "PerspectiveCamera") return false;

    const requiredNumbers = [
        "fov",
        "zoom",
        "near",
        "far",
        "focus",
        "aspect",
        "filmGauge",
        "filmOffset",
    ];

    for (const prop of requiredNumbers) {
        if (typeof json.object[prop] !== "number") return false;
    }

    if (json.object.view instanceof Object) {
        if (typeof json.object.view.enabled !== "boolean") return false;
        if (typeof json.object.view.fullWidth !== "number") return false;
        if (typeof json.object.view.fullHeight !== "number") return false;
        if (typeof json.object.view.offsetX !== "number") return false;
        if (typeof json.object.view.offsetY !== "number") return false;
        if (typeof json.object.view.width !== "number") return false;
        if (typeof json.object.view.height !== "number") return false;
    }

    if (!isObject3D(json)) return false;

    return true;
}

export type { PerspectiveCamera };
export { isPerspectiveCamera };