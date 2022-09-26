interface ObjectFormat {
    id: number;
    uuid: string;
    type: string;
    name: string;
    matrix: number[];
    children?: ObjectFormat[];
    receiveShadow?: boolean;
    castShadow?: boolean;
    visible?: boolean;
    frustumCulled?: boolean;
    renderOrder?: number;
    userData?: any;
}

export default ObjectFormat;