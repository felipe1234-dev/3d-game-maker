import AttributeFormat from "./Attribute.interface";

interface Geometry {
    id: number;
    uuid: string;
    type: string;
    name?: string;
    data: {
        attributes?: {
            [name: string]: AttributeFormat;
        };
        index?: {
            type: string;
            array: number[];
        };
        morphAttributes?: {
            [name: string]: AttributeFormat[];
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