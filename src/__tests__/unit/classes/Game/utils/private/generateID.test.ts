import { generateID } from "@local/classes/Game/utils/private";

describe("generateID.function", () => {
    it("should always return unique IDs", () => {
        const IDs: number[] = [];

        for (let i = 0; i < 100; i++) {
            const newID = generateID();

            expect(IDs.includes(newID)).toBe(false);

            IDs.push(newID);
        }
    });
});