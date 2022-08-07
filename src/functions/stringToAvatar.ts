import stringToColor from "./stringToColor";

export default function stringToAvatar(name: string): {
    color: string,
    shortName: string
} {
    let chars = name.match(/(^\w|\s\w)/g);
    let shortName: string | undefined;

    if (!!chars) {
        chars = chars.map((char) => char.trim());

        shortName = chars.join("");
        shortName = shortName.length > 1 ? shortName[0] + shortName[1] : shortName[0];
    }


    return {
        color: stringToColor(name),
        shortName: shortName ? shortName : name
    };
};