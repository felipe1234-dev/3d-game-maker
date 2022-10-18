import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useForceUpdate } from "@local/hooks";

let renderCount = 0;

function Test() {
    const { forceUpdate } = useForceUpdate();

    return (
        <button data-testid="force-update" onClick={forceUpdate}>
            Update {renderCount++}
        </button>
    );
}

describe("useForceUpdate", () => {
    it("should rerender the component", () => {
        render(<Test />);

        const button = screen.getByTestId("force-update");

        let i = renderCount;
        while (i < 10) {
            fireEvent.click(button);

            i++;
        }

        expect(i).toBe(renderCount);
    });
});