import { Game } from "@local/classes";

interface Light extends Game.Formats.Object {
    type: typeof Game.Libs.lights[number];
    color: string | number; // Color representation
    intensity: number;
}

function isLight(json: any): json is Light {
    if (typeof json !== "object") return false;

    const typeIsCorrect = !!Game.Libs.lights[json.type];
    const colorIsCorrect = ["string", "number"].includes(typeof json.color);
    const intensityIsCorrect = typeof json.intensity === "number";

    return typeIsCorrect && colorIsCorrect && intensityIsCorrect;
}

export type { Light };
export { isLight };