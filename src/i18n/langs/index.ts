import en_US from "./en_US";
import pt_BR from "./pt_BR";

const DEFAULT_LANG = "en_US";

const langs: {
    [lang: string]: {
        [key: string]: string
    }
} = {
    en_US,
    pt_BR
}

export default langs;
export { DEFAULT_LANG, en_US, pt_BR };