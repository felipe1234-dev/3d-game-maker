interface Source {
    uuid: string;
    url: string;
}

function isSource(json: any): json is Source {
    const isObj = json instanceof Object;
    if (!isObj) return false;

    return typeof json.uuid === "string" && typeof json.url === "string";
}

export type { Source };
export { isSource };