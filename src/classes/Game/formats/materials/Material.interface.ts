import * as THREE from "three";

interface Material {
    uuid: string;
    type: string;
    name?: string;

    alphaTest?: number;
    stencilRef: number;
    stencilWriteMask: number;
    stencilFuncMask: number;
    opacity?: number;
    polygonOffsetFactor?: number;
    polygonOffsetUnits?: number;

    alphaToCoverage?: boolean;
    colorWrite: boolean;
    depthTest: boolean;
    depthWrite: boolean;
    stencilWrite: boolean;
    polygonOffset?: boolean;
    premultipliedAlpha?: boolean;
    dithering?: boolean;
    toneMapped?: boolean;
    transparent?: boolean;
    vertexColors?: boolean;
    visible?: boolean;

    blending?: THREE.Blending;
    stencilFunc: THREE.StencilFunc;
    depthFunc: THREE.DepthModes;
    stencilFail: THREE.StencilOp;
    stencilZFail: THREE.StencilOp;
    stencilZPass: THREE.StencilOp;
    side?: THREE.Side;
    shadowSide?: THREE.Side;

    userData?: any;
}

function isMaterial(json: any): json is Material {
    if (!(json instanceof Object)) return false;

    if (typeof json.uuid !== "string") return false;
    if (typeof json.name !== "string") return false;
    if (json.name !== undefined) {
        if (typeof json.type !== "string") return false;
    }

    const requiredNumbers = [
        "alphaTest",
        "stencilRef",
        "stencilWriteMask",
        "stencilFuncMask",
        "opacity",
        "polygonOffsetFactor",
        "polygonOffsetUnits",
    ];
    for (const prop of requiredNumbers) {
        if (typeof json[prop] !== "number") return false;
    }

    const optionalNumbers = [
        "blendDstAlpha?",
        "blendEquationAlpha?",
        "blendSrcAlpha?",
    ];
    for (const prop of optionalNumbers) {
        if (json[prop] !== undefined) {
            if (typeof json[prop] !== "number") return false;
        }
    }

    const requiredBooleans = [
        "alphaToCoverage",
        "clipIntersection",
        "clipShadows",
        "colorWrite",
        "depthTest",
        "depthWrite",
        "stencilWrite",
        "polygonOffset",
        "premultipliedAlpha",
        "dithering",
        "toneMapped",
        "transparent",
        "vertexColors",
        "visible",
    ];
    for (const prop of requiredBooleans) {
        if (typeof json[prop] !== "boolean") return false;
    }

    if (json.userData) {
        if (!(json.userData instanceof Object)) return false;
    }

    return true;
}

export type { Material };
export { isMaterial };