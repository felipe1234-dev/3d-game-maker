import * as THREE from "three";

function threeColorToHex(color: THREE.Color): string {
    let { r, g, b } = color;

    r *= 255;
    g *= 255;
    b *= 255;

    const hex =
        "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

    return hex;
}

export default threeColorToHex;