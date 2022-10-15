import { translate } from "@local/i18n";
import { getEnv } from "@local/functions";
import openWindow from "@local/__mocks__/openWindow.mock";

const PORT = getEnv("port");
const BASE_URL = `http://localhost:${PORT}/#`;

describe("i18n.translate", () => {
    it("should return the same string if no translation is found", () => {
        openWindow(`${BASE_URL}/pt_BR`);

        const textToBeTranslated = "should-not-be-translated";

        expect(translate(textToBeTranslated)).toBe(textToBeTranslated);
    });
});