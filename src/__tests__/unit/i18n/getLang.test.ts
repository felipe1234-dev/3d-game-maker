import { getLang, DEFAULT_LANG } from "@local/i18n";
import { getEnv } from "@local/functions";

const PORT = getEnv("port");
const BASE_URL = `http://localhost:${PORT}/#`;

describe("i18n.getLang", () => {
    const openWindow = (url: string) => {
        Object.defineProperty(global, "window", {
            value: {
                ...window,
                location: {
                    ...window.location,
                    href: url
                },
            },
            writable: true,
        });
    };

    it("should return the default language if none provided in the URL", () => {
        openWindow(BASE_URL);

        expect(getLang()).toBe(DEFAULT_LANG);
    });

    it("should return the correct language as specified in the URL", async () => {
        const lang = "pt_BR";
        openWindow(`${BASE_URL}/${lang}`);

        expect(getLang()).toBe(lang);
    });

    it("should return the closest match if the provided language is incorrect", () => {
        const correctLang = "pt_BR";

        let wrongLang = "pt-b";
        openWindow(`${BASE_URL}/${wrongLang}`);
        expect(getLang()).toBe(correctLang);

        wrongLang = "br";
        openWindow(`${BASE_URL}/${wrongLang}`);
        expect(getLang()).toBe(correctLang);

        wrongLang = "pt br";
        openWindow(`${BASE_URL}/${wrongLang}`);
        expect(getLang()).toBe(correctLang);
    });
});