export default function rgbToHex(r: number, g: number, b: number): string {
    if (r > 255 || g > 255 || b > 255) {
        throw new Error("Invalid color component");
    }

    const hex = ((r << 16) | (g << 8) | b).toString(16);

    return "#" + ("000000" + hex).slice(-6);
};