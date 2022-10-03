interface BufferAttribute {
    itemSize: number;
    type: string;
    array: number[];
    normalized: boolean;
    name?: string;
    usage?: number;
    updateRange?: {
        offset: number;
        count: number;
    };
}

function isBufferAttribute(json: any): json is BufferAttribute {
    if (!(json instanceof Object)) return false;

    if (typeof json.itemSize === "number") return false;

    if (typeof json.type === "string") return false;

    if (!Array.isArray(json.array)) return false;

    if (json.array.some((item: any) => typeof item !== "number")) return false;

    if (typeof json.normalized !== "boolean") return false;

    if (json.name && typeof json.name !== "string") return false;

    if (json.usage && typeof json.usage !== "number") return false;

    if (json.updateRange) {
        if (!(json.updateRange instanceof Object)) return false;

        if (typeof json.updateRange.offset !== "number") return false;
        if (typeof json.updateRange.count !== "number") return false;
    }

    return true;
}

export type { BufferAttribute };
export { isBufferAttribute };