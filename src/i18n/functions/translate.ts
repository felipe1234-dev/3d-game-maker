import langs from "../langs";
import getLang from "./getLang";

function translate(key: string) {
    const lang = getLang();

    return langs[lang][key] || key;
}

export default translate;