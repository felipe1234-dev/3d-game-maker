import langs from "../langs";
import getLang from "./getLang";

function translate(...texts: string[]): string {
    const lang = getLang();
    let result = "";

    for (const text of texts) {
        result += langs[lang][text] || text || "";
    }

    return result;
}

export default translate;