interface Geometry {
    id: number;
    uuid: string;
    type: string;
    name: string;
    data: {
        attributes?: {
            [key: string]: any;
        };
        index?: {
            type: string;
            array: ArrayLike<number>;
        };
        morphAttributes?: {
            [key: string]: any[];
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