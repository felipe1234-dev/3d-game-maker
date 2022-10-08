import { Object3D, isObject3D } from "../base";
import { lights } from "../../libs";

interface Light extends Object3D {
    object: Object3D["object"] & {
        type: typeof lights[number];
        color: string | number; // Color representation
        intensity: number;
    }
}

function isLight(json: any): json is Light {
    if (!(json instanceof Object)) return false;
    if (!(json.object instanceof Object)) return false;

    const isObj3D = isObject3D(json);
    const typeIsCorrect = [...lights].includes(json.object.type);
    const colorIsCorrect = ["string", "number"].includes(typeof json.object.color);
    const intensityIsCorrect = typeof json.object.intensity === "number";

    return isObj3D && typeIsCorrect && colorIsCorrect && intensityIsCorrect;
}

export type { Light };
export { isLight };