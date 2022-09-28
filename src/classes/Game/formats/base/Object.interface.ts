interface Object {
    id: number;
    uuid: string;
    type: string;
    name?: string;
    matrix: number[];
    children?: Object[];
    receiveShadow?: boolean;
    castShadow?: boolean;
    visible?: boolean;
    frustumCulled?: boolean;
    renderOrder?: number;
    userData?: any;
}

export default Object;