import { getEnv } from "@local/functions";

describe("getEnv", () => {
    it("should return the env variable correctly", () => {
        const port = getEnv("port");
        expect(port).toBeDefined();
    });
});