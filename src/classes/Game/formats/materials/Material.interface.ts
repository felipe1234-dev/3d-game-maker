import { materials } from "../../libs";
import * as THREE from "three";

interface Material {
    metadata?: {
        version: 4.5;
        type: "Material";
        generator: "Material.toJSON";
    };
    uuid: string;
    type: typeof materials[number];
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
    if (
        json.name !== undefined &&
        typeof json.name !== "string"
    ) return false;
    if (![...materials].includes(json.type)) return false;

    const requiredNumbers = [
        "stencilRef",
        "stencilWriteMask",
        "stencilFuncMask"
    ];
    for (const prop of requiredNumbers) {
        if (typeof json[prop] !== "number") return false;
    }

    const optionalNumbers = [
        "alphaTest",
        "opacity",
        "polygonOffsetFactor",
        "polygonOffsetUnits",
    ];
    for (const prop of optionalNumbers) {
        if (
            json[prop] !== undefined &&
            typeof json[prop] !== "number"
        ) return false;
    }

    const requiredBooleans = [
        "colorWrite",
        "depthTest",
        "depthWrite",
        "stencilWrite",
    ];
    for (const prop of requiredBooleans) {
        if (typeof json[prop] !== "boolean") return false;
    }

    const optionalBooleans = [
        "alphaToCoverage",
        "polygonOffset",
        "premultipliedAlpha",
        "dithering",
        "toneMapped",
        "transparent",
        "vertexColors",
        "visible",
    ];
    for (const prop of optionalBooleans) {
        if (
            json[prop] !== undefined &&
            typeof json[prop] !== "boolean"
        ) return false;
    }

    const stencilOps = [
        THREE.ZeroStencilOp,
        THREE.KeepStencilOp,
        THREE.ReplaceStencilOp,
        THREE.IncrementStencilOp,
        THREE.DecrementStencilOp,
        THREE.IncrementWrapStencilOp,
        THREE.DecrementWrapStencilOp,
        THREE.InvertStencilOp,
    ];
    const requiredEnums = Object.entries({
        stencilFunc: [
            THREE.NeverStencilFunc,
            THREE.LessStencilFunc,
            THREE.EqualStencilFunc,
            THREE.LessEqualStencilFunc,
            THREE.GreaterStencilFunc,
            THREE.NotEqualStencilFunc,
            THREE.GreaterEqualStencilFunc,
            THREE.AlwaysStencilFunc,
        ],
        depthFunc: [
            THREE.NeverDepth,
            THREE.AlwaysDepth,
            THREE.LessDepth,
            THREE.LessEqualDepth,
            THREE.EqualDepth,
            THREE.GreaterEqualDepth,
            THREE.GreaterDepth,
            THREE.NotEqualDepth,
        ],
        stencilFail: stencilOps,
        stencilZFail: stencilOps,
        stencilZPass: stencilOps
    });
    for (const [prop, options] of requiredEnums) {
        if (!options.includes(json[prop])) return false;
    }

    const sides = [
        THREE.FrontSide,
        THREE.BackSide,
        THREE.DoubleSide,
    ];
    const optionalEnums = Object.entries({
        blending: [
            THREE.NoBlending,
            THREE.NormalBlending,
            THREE.AdditiveBlending,
            THREE.SubtractiveBlending,
            THREE.MultiplyBlending,
            THREE.CustomBlending,
        ],
        side: sides,
        shadowSide: sides
    });
    for (const [prop, options] of optionalEnums) {
        if (
            json[prop] !== undefined &&
            options.includes(json[prop])
        ) return false;
    }

    if (json.userData !== undefined) {
        if (!(json.userData instanceof Object)) return false;
    }

    return true;
}

export type { Material };
export { isMaterial };