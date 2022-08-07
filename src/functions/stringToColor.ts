export default function stringToColor(string: string): string {
    let hash = 0;
    let i: number;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}