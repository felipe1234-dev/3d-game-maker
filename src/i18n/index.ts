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

const getLang = () => (
    window.location.href.replace(/^.+\/#\/(\w+)\/.+$/, "$1")
);

export default i18n;
export { getLang };