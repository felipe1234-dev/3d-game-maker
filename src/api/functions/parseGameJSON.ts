import { Game as GameFormat } from "@local/classes/Game/formats/base";

function parseGameJSON(json: string): GameFormat {
    return JSON.parse(json, (key: string, value: any) => {
        if (value === "Infinity") {
            return Infinity;
        }

        return value;
    });
}

export default parseGameJSON;