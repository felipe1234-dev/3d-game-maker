import langs, { DEFAULT_LANG } from "../langs";

function getLang() {
    const langInURL = window.location.href.replace(/^.+\/#\/(\w+).*$/, "$1");
    const fixedLang = langInURL.replace(/[\s-]+/g, "_").toLowerCase(); // pT-Br -> pt_br / pt br -> pt_br
    const trans = langs[fixedLang];

    if (!trans) {
        const closestMatch = Object.keys(langs).find(lang => {
            lang = lang.toLowerCase();

            return lang.includes(fixedLang) || fixedLang.includes(lang);
        });

        if (closestMatch) {
            return closestMatch;
        } else {
            return DEFAULT_LANG; // default
        }
    } else {
        return fixedLang;
    }
}

export default getLang;