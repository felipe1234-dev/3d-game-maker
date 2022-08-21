import en_US from "./en_US";
import pt_BR from "./pt_BR";

const i18n: { 
    [lang: string]: {
        [key: string]: string
    } 
} = {
    en_US,
    pt_BR
}

const getLang = () => {
    const langInURL = window.location.href.replace(/^.+\/#\/(\w+)\/.+$/, "$1");
    const fixedLang = langInURL.replace("-", "_").replace(/_(\w+)$/g, m => m.toUpperCase()); // pt-br -> pt_BR

    let trans = i18n[fixedLang];
        
    if (!trans) {
        const closestMatch = Object.keys(i18n).find(lang => (
            lang.includes(fixedLang) || fixedLang.includes(lang)
        ));
            
        if (closestMatch) {
            return closestMatch;
        } else {
            return "en_US"; // default
        }
    } else {
        return fixedLang;
    }
};

const t = (key: string) => {
    const lang = getLang();

    return i18n[lang][key] || key; 
};

export default i18n;
export { getLang, t };