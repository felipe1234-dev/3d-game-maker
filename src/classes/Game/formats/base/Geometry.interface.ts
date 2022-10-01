import BufferAttributeFormat from "./BufferAttribute.interface";

interface Geometry {
    id: number;
    uuid: string;
    type: string;
    name?: string;
    data: {
        attributes?: {
            [name: string]: BufferAttributeFormat;
        };
        index?: BufferAttributeFormat;
        morphAttributes?: {
            [name: string]: BufferAttributeFormat[];
        };
        morphTargetsRelative?: boolean;
        groups?: {
            start: number;
            count: number;
            materialIndex?: number | undefined;
        }[];
        boundingSphere?: {
            center: number[];
            radius: number;
        };
    };
    userData: any;
}

export default Geometry;