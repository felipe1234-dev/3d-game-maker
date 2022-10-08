import { Game } from "@local/classes";

interface Object3D {
    id: number;
    uuid: string;
    type: typeof Game.Libs.objects3D[number];
    name?: string;
    matrix: number[];
    children?: Object3D[];
    receiveShadow?: boolean;
    castShadow?: boolean;
    visible?: boolean;
    frustumCulled?: boolean;
    renderOrder?: number;
    userData?: any;
}

function isObject3D(json: any): json is Object3D {
    const isObj = json instanceof Object;
    if (!isObj) return false;

    const isID = typeof json.id === "string";
    const isUuid = typeof json.uuid === "string";
    const isType = typeof json.type === "string";

    const hasName = !!json.name;
    const isName = hasName ? typeof json.name === "string" : false;

    const isMatrix = Array.isArray(json.matrix)
        ? json.matrix.every((item: any) => typeof item === "number")
        : false;

    const hasChildren = !!json.children;
    const isChildren =
        hasChildren && Array.isArray(json.children)
            ? json.children.every((item: any) => isObject3D(item))
            : false;

    const hasReceiveShadow = json.receiveShadow !== undefined;
    const isReceiveShadow = hasReceiveShadow
        ? typeof json.receiveShadow === "boolean"
        : false;

    const hasCastShadow = json.castShadow !== undefined;
    const isCastShadow = hasCastShadow
        ? typeof json.castShadow === "boolean"
        : false;

    const hasVisible = json.visible !== undefined;
    const isVisible = hasVisible ? typeof json.visible === "boolean" : false;

    const hasFrustumCulled = json.hasFrustumCulled !== undefined;
    const isFrustumCulled = hasFrustumCulled
        ? typeof json.hasFrustumCulled === "boolean"
        : false;

    const hasRenderOrder = json.renderOrder !== undefined;
    const isRenderOrder = hasRenderOrder
        ? typeof json.renderOrder === "number"
        : false;

    return (
        isID &&
        isUuid &&
        isType &&
        (hasName ? isName : true) &&
        isMatrix &&
        (hasChildren ? isChildren : true) &&
        (hasReceiveShadow ? isReceiveShadow : true) &&
        (hasCastShadow ? isCastShadow : true) &&
        (hasVisible ? isVisible : true) &&
        (hasFrustumCulled ? isFrustumCulled : true) &&
        (hasRenderOrder ? isRenderOrder : true)
    );
}

export type { Object3D };
export { isObject3D };