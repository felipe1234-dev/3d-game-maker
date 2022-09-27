interface Attribute {
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

export default Attribute;