import en_US from "./en_US";
import pt_BR from "./pt_BR";

const DEFAULT_LANG = "en_US";

const table: {
    [lang: string]: {
        [key: string]: string
    }
} = {
    en_US,
    pt_BR
}

export default table;
export { DEFAULT_LANG, en_US, pt_BR };