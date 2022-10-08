import * as THREE from "three";

interface Material {
    uuid: string;
    type: string;
    name?: string;

    color?: number; // Color representation as a number
    roughness?: number;
    metalness?: number;

    sheen?: number;
    sheenColor?: number; // Color representation as a number
    sheenRoughness?: number;
    emissive?: number; // Color representation as a number
    emissiveIntensity?: number;

    specular?: number; // Color representation as a number
    specularIntensity?: number;
    specularColor?: number; // Color representation as a number

    shininess?: number;
    clearcoat?: number;
    clearcoatRoughness?: number;
    clearcoatMap?: string; // Texture uuid
    clearcoatRoughnessMap?: string; // Texture uuid
    clearcoatNormalMap?: string; // Texture uuid
    clearcoatNormalScale?: [x: number, y: number];

    iridescence?: number;
    iridesceneceIOR?: number;
    iridescenceThicknessRange?: number[];
    iridescenceMap?: string; // Texture uuid
    iridescenceThicknessMap?: string; // Texture uuid

    map?: string; // Texture uuid
    matcap?: string; // Texture uuid
    alphaMap?: string; // Texture uuid

    lightMap?: string; // Texture uuid
    lightMapIntensity?: number;

    aoMap?: string; // Texture uuid
    aoMapIntensity?: number;

    bumpMap?: string; // Texture uuid
    bumpScale?: number;

    normalMap?: string; // Texture uuid
    normalMapType?: THREE.NormalMapTypes;
    normalScale?: [x: number, y: number];

    displacementMap?: string; // Texture uuid
    displacementScale?: number;
    displacementBias?: number;

    roughnessMap?: string; // Texture uuid
    metalnessMap?: string; // Texture uuid

    emissiveMap?: string; // Texture uuid
    specularMap?: string; // Texture uuid
    specularIntensityMap?: string; // Texture uuid
    specularColorMap?: string; // Texture uuid

    envMap?: string; // Texture uuid
    combine?: THREE.Combine;

    envMapIntensity?: number;
    reflectivity?: number;
    refractionRatio?: number;

    gradientMap?: string; // Texture uuid

    transmission?: number;
    transmissionMap?: string; // Texture uuid

    thickness?: number;
    thicknessMap?: string; // Texture uuid

    attenuationDistance?: number;
    attenuationColor?: number; // Color representation as a number

    size?: number;
    shadowSize?: number;
    sizeAttenuation?: number;

    blending?: THREE.Blending;
    side?: THREE.Side;
    vertexColors?: boolean;

    opacity?: number;
    transparent?: boolean;

    depthFunc: THREE.DepthModes;
    depthTest: boolean;
    depthWrite: boolean;
    colorWrite: boolean;

    stencilWrite: boolean;
    stencilFunc: THREE.StencilFunc;
    stencilRef: number;
    stencilWriteMask: number;
    stencilFuncMask: number;
    stencilFail: THREE.StencilOp;
    stencilZFail: THREE.StencilOp;
    stencilZPass: THREE.StencilOp;

    rotation?: number;
    polygonOffset?: boolean;
    polygonOffsetFactor?: number;
    polygonOffsetUnits?: number;

    lineWidth?: number;
    dashSize?: number;

    gapSize?: number;
    scale?: number;

    dithering?: boolean;

    alphaTest?: number;
    alphaToCoverage?: boolean;
    premultipliedAlpha?: boolean;

    wireframe?: boolean;
    wireframeLinewidth?: number;
    wireframeLinecap?: string;
    wireframeLinejoin?: string;

    flatShading?: boolean;
    visible?: boolean;
    toneMapped?: boolean;

    fog?: boolean;

    userData: any;
}

export default Material;