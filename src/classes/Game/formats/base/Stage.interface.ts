interface Stage {
    id: number;
    uuid: string;
    name: string;
    game?: string;
    scenes: string[]; // Scene uuids
}

function isStage(json: any): json is Stage {
    if (!(json instanceof Object)) return false;

    return (
        typeof json.id === "number" &&
        typeof json.uuid === "string" &&
        typeof json.name === "string" &&
        (json.game ? typeof json.game === "string" : true) &&
        Array.isArray(json.scenes) &&
        json.scenes.every((item: any) => typeof item === "string")
    );
}

export type { Stage };
export { isStage };