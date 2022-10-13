import * as THREE from "three";

interface Texture {
    uuid: string;
    name: string;

    type: THREE.TextureDataType;

    image: string; // Image uuid

    mapping: THREE.Mapping;

    repeat: [x: number, y: number];
    offset: [x: number, y: number];
    center: [x: number, y: number];
    wrap: [wrapS: THREE.Wrapping, wrapT: THREE.Wrapping];

    rotation: number;
    format: THREE.PixelFormat;
    encoding: THREE.TextureEncoding;

    minFilter: THREE.TextureFilter;
    magFilter: THREE.TextureFilter;

    anisotropy: number;

    flipY: boolean;

    premultiplyAlpha: boolean;
    unpackAlignment: number;

    userData: any;
}

function isTexture(json: any): json is Texture {
    return true;
}

export type { Texture };
export { isTexture };