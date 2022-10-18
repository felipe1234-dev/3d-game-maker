import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useEffect } from "react";
import { useUnmount } from "@local/hooks";

let mounted = false;
let unmounted = false;

function Test() {
    useEffect(() => {
        mounted = true;
    }, []);

    useUnmount(() => {
        unmounted = true;
    });

    return <></>;
}

afterEach(() => {
    mounted = false;
    unmounted = false;
});

describe("useUnmount hook", () => {
    it("should run only after the component unmounts", () => {
        const { unmount } = render(<Test />);

        expect(mounted).toBe(true);
        expect(unmounted).toBe(false);

        unmount();

        expect(mounted).toBe(true);
        expect(unmounted).toBe(true);
    });
});