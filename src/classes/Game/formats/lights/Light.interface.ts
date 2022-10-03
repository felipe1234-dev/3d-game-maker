import { Game } from "@local/classes";

interface Light extends Game.Formats.Object3D {
    type: typeof Game.Libs.lights[number];
    color: string | number; // Color representation
    intensity: number;
}

function isLight(json: any): json is Light {
    const isObject3D = Game.Formats.isObject3D(json);
    const typeIsCorrect = !!Game.Libs.lights[json.type];
    const colorIsCorrect = ["string", "number"].includes(typeof json.color);
    const intensityIsCorrect = typeof json.intensity === "number";

    return isObject3D && typeIsCorrect && colorIsCorrect && intensityIsCorrect;
}

export type { Light };
export { isLight };